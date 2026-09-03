from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

# TSK-966: --emit-json is the single-writer feed for the readable /resume/ HTML and
# has to run in CI, where reportlab is not installed. Keep the structured emission
# stdlib-only; PDF generation still needs reportlab and refuses loudly without it.
try:
    from reportlab.lib import colors
    from reportlab.lib.enums import TA_CENTER
    from reportlab.lib.pagesizes import LETTER
    from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
    from reportlab.lib.units import inch
    from reportlab.platypus import (
        HRFlowable,
        Paragraph,
        SimpleDocTemplate,
        Spacer,
    )
except ModuleNotFoundError:  # pragma: no cover - exercised only without reportlab
    colors = None

PDF_AVAILABLE = colors is not None


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public" / "downloads"
ARCHIVE_DIR = ROOT / "output" / "pdf"
WEB_JSON_PATH = ROOT / "app" / "resume" / "general-resume.json"

if PDF_AVAILABLE:
    INK = colors.HexColor("#0B1533")
    COBALT = colors.HexColor("#0B4CFF")
    COPPER = colors.HexColor("#B63A1F")
    MUTED = colors.HexColor("#505A6A")
    LINE = colors.HexColor("#CED3DC")


# Content source of truth: the current corrected Notion resume-lane source
# pages (Master Resume + Career Evidence Ledger downstream lanes). Claim
# boundaries: Cafe Linger operations ended Dec 2022 with paid closure
# administration/consulting through Jan 2024 (never "Present"); Resale Scanner
# Pro is a personal/private working AI-assisted application used in a small
# family resale workflow (never commercial SaaS, customer deployment, mature
# finished production product, or paid software-engineering employment).

EDUCATION = [
    "Florida International University - B.S., Hospitality Management; Minor, Beverage Management",
    "The Culinary Institute of America - A.S., Culinary Arts; May 2007-Apr 2010",
    "Valencia Community College - A.A., General Studies",
]

CAFE_LINGER_TITLE = "Cafe Linger - Executive Chef to General Manager | Orlando, FL | May 2018-Dec 2022"
FARM_HAUS_TITLE = "Farm-Haus / Farm & Haus - Chef de Cuisine | Greater Orlando | Sep 2015-Apr 2018"
SOUTHERN_SWANK_TITLE = "Southern Swank Kitchen - Head Chef | Davie, FL | Jul 2013-May 2014"

RESUMES = [
    {
        # PUBLIC DEFAULT — the broad General Resume served by the site's primary
        # Download Resume action. Derived from the canonical General Resume Base
        # (downstream of the Master Resume + Career Evidence Ledger); the three
        # targeted lanes below remain the application-specific variants.
        "filename": "Angel_Vergara_Resume_General.pdf",
        "headline": "HOSPITALITY TECHNOLOGY & OPERATIONS | IMPLEMENTATION, BUSINESS SYSTEMS & AI WORKFLOWS",
        "profile": (
            "Bilingual hospitality operations leader and systems builder with verified Executive Chef to General "
            "Manager progression. Translates frontline operating pressure into clear requirements, repeatable "
            "workflows, practical tools, and confident adoption - spanning business-process mapping, operational "
            "reporting, implementation support, and human-controlled AI-assisted workflow design. Builds from real "
            "operating friction, with working application and systems proof and a clear boundary between employment "
            "experience and personal project evidence."
        ),
        "strengths": (
            "Operations leadership & training | business-process mapping | requirements gathering | "
            "implementation & adoption support | workflow and exception design | operational reporting (inventory, "
            "food cost, vendor pricing, payroll, P&L awareness) | human-in-the-loop AI workflow design | "
            "LLM API integration | documentation & handoffs | vendor & purchasing coordination | "
            "bilingual English/Spanish"
        ),
        "projects": [
            "Hobbyst Resale - Active family resale venture: sourcing, inventory, pricing, listings, sales, shipping, "
            "marketplace workflows, KPI tracking, and automation.",
            "Resale Scanner Pro - Working personal AI-assisted application used in the family resale workflow: item "
            "capture, AI-assisted identification, market research, BUY / MAYBE / PASS decision support, listing "
            "preparation, publishing, and operating records.",
            "Loft OS - Sanitized architecture case study: governed multi-agent AI workflows with scoped roles, "
            "human authorization, evidence-backed review, fail-closed controls, recovery paths, and "
            "deterministic closeout.",
            "Sous Chef - Public AI-assisted culinary workspace: authenticated recipe workflows, pantry and inventory "
            "signals, cookbooks, and cooking-session history.",
        ],
        "experience": [
            (
                CAFE_LINGER_TITLE,
                [
                    "Became General Manager in Jan 2019 as administrative and financial responsibilities expanded beyond culinary leadership.",
                    "Led production, purchasing, inventory, vendors, scheduling, training, POS reporting, payroll-data review, QuickBooks workflows, P&L review, compliance, and customer experience.",
                    "Continued paid closure administration and restaurant consulting through Jan 2024 after operations ended in Dec 2022.",
                ],
            ),
            (
                FARM_HAUS_TITLE,
                [
                    "Helped establish the kitchen workflow, then led culinary execution, production, ordering, food quality, and team coordination while partnering with ownership on operating consistency and growth support.",
                ],
            ),
            (
                SOUTHERN_SWANK_TITLE,
                [
                    "Built opening-stage menu and recipe systems; hired, trained, and scheduled approximately 12 employees for a roughly 200-seat venue.",
                ],
            ),
            (
                "Earlier Culinary Experience & Leadership | Florida and Massachusetts",
                [
                    "Progressed from line and pastry work into Sous Chef and Head Chef responsibilities across high-volume restaurants, openings, and hotel operations.",
                ],
            ),
        ],
        "tools": (
            "Notion | Excel & spreadsheets | Git and GitHub | Railway | Supabase integration | Postgres/SQL exposure | "
            "React | TypeScript | Node/Express | Gemini | Claude API | n8n-style automation"
        ),
    },
    {
        "filename": "Angel_Vergara_Resume_Implementation_Onboarding.pdf",
        "headline": "HOSPITALITY OPERATIONS LEADER | IMPLEMENTATION & ONBOARDING",
        "profile": (
            "Hospitality operations leader bringing 14+ years of restaurant leadership into restaurant technology "
            "implementation. Progressed from Executive Chef to General Manager with hands-on ownership of workforce "
            "scheduling, payroll-data review, inventory and procurement, vendors, reporting, training, financial "
            "administration, and customer experience. Translates frontline operating needs into clear requirements, "
            "accurate data, repeatable workflows, practical tools, and confident adoption. Comfortable with Excel and "
            "Pivot Tables, with current systems work extending into workflow automation and AI-assisted applications. "
            "English/Spanish bilingual."
        ),
        "strengths": (
            "Restaurant & hospitality operations | customer-facing problem solving | implementation readiness & adoption | "
            "workflow discovery & requirements translation | training & change management | data collection & validation | "
            "Excel & Pivot Tables | workforce scheduling | payroll-data review | inventory & procurement | "
            "vendor & third-party coordination | process documentation & handoffs | bilingual English/Spanish"
        ),
        "projects": [
            "Resale Scanner Pro - Personal workflow application built for Hobbyst Resale, a small family eBay resale "
            "business: item capture, AI-assisted identification, market research, BUY / MAYBE / PASS decisions, listing "
            "preparation, publishing, and operating records; actively evolving personal project evidence.",
            "Loft OS - Sanitized architecture case study: governed workflow moving work through scoped intake, "
            "role-separated execution, human approval, evidence-backed review, recovery, and deterministic closeout.",
            "Sous Chef - Public application: hospitality-domain workspace for authenticated recipe workflows, pantry and "
            "inventory signals, cookbooks, session history, and AI-assisted creation.",
        ],
        "experience": [
            (
                CAFE_LINGER_TITLE,
                [
                    "Became General Manager in Jan 2019 as administrative and financial responsibilities expanded beyond culinary leadership.",
                    "Led day-to-day operations across production, purchasing, inventory, vendors, scheduling, staff training, reporting, compliance, and customer experience.",
                    "Managed vendor accounts, invoices, recurring bills, POS reporting, payroll-data review, QuickBooks workflows, P&L review, and cash-flow awareness.",
                    "Built and maintained Excel spreadsheets for payroll, ordering, inventory, and operational reporting, using linked formulas and Pivot Tables.",
                    "Continued paid account-closure, administrative, and restaurant-consulting work after the restaurant closed, through Jan 2024.",
                ],
            ),
            (
                FARM_HAUS_TITLE,
                [
                    "Began with consultation work to establish kitchen workflow, then led production, quality, ordering, inventory, training, and service execution.",
                    "Worked directly with ownership on operating consistency and growth support while coordinating kitchen production, quality, ordering, inventory, training, and service execution.",
                ],
            ),
            (
                SOUTHERN_SWANK_TITLE,
                [
                    "Created the opening menu and recipes; hired, trained, scheduled, and managed approximately 12 employees for a roughly 200-seat venue.",
                    "Coordinated FOH/BOH staffing, inventory, food-and-beverage ordering, and opening-stage operating systems.",
                ],
            ),
        ],
        "tools": (
            "Excel (Pivot Tables) | Notion | Git and GitHub | Railway | Supabase integration | Postgres/SQL exposure | "
            "React | TypeScript | Node/Express | Gemini | Claude API | marketplace APIs | n8n-style automation"
        ),
    },
    {
        "filename": "Angel_Vergara_Resume_Business_Systems_Operations.pdf",
        "headline": "OPERATIONS LEADER | BUSINESS SYSTEMS & OPERATIONS",
        "profile": (
            "Hospitality operations leader and systems builder with verified Executive Chef to General Manager "
            "progression. Turns operating problems into clear requirements, workflows, reports, and usable tools by "
            "combining frontline judgment with purchasing, inventory, vendor administration, POS data, payroll review, "
            "P&L awareness, process mapping, documentation, and hands-on product delivery. English/Spanish bilingual "
            "capability supports stakeholder communication, documentation, and adoption."
        ),
        "strengths": (
            "Business-process mapping | requirements gathering | workflow analysis | operational reporting | "
            "POS and spreadsheet analysis | decision rules | exception handling | inventory and purchasing | "
            "vendor and invoice coordination | payroll-data review | P&L and cash-flow awareness | workforce routines | "
            "documentation | bilingual English/Spanish"
        ),
        "projects": [
            "Resale Scanner Pro - Working personal AI-assisted workflow application used in a small family resale "
            "workflow: structured intake, AI-assisted research, human review gates, external-service integration, "
            "publishing workflows, and operating records within a family-use context.",
            "Loft OS - Sanitized architecture case study: governed workflow patterns for scope, authorization, evidence, "
            "recovery, and closeout, focused on visible ownership and fail-closed controls.",
        ],
        "experience": [
            (
                CAFE_LINGER_TITLE,
                [
                    "Promoted to General Manager in Jan 2019 after expanding into administrative, financial, and operating-system ownership.",
                    "Used POS and spreadsheet reporting to review sales mix, inventory, food cost, menu margin, vendor pricing, payroll, and operating performance.",
                    "Coordinated purchasing, vendor accounts, invoices, recurring bills, QuickBooks workflows, P&L review, cash-flow awareness, licensing, and maintenance follow-through.",
                    "Continued paid shutdown administration and restaurant consulting through Jan 2024, closing accounts and completing business wrap-up.",
                ],
            ),
            (
                FARM_HAUS_TITLE,
                [
                    "Helped establish the kitchen workflow, production routines, ordering practices, inventory controls, and quality standards.",
                    "Partnered with ownership on operating consistency and growth support while coordinating kitchen workflow, production routines, ordering practices, inventory controls, quality, and team execution.",
                ],
            ),
            (
                SOUTHERN_SWANK_TITLE,
                [
                    "Built opening-stage menu, recipe, staffing, scheduling, inventory, and ordering systems for a roughly 200-seat venue.",
                    "Hired, trained, scheduled, and managed approximately 12 employees across the opening operation.",
                ],
            ),
        ],
        "tools": (
            "Spreadsheets | Notion databases and dashboards | verified Supabase integration | Postgres/SQL exposure | "
            "Git and GitHub | Railway | React/TypeScript | Node/Express | automation architecture"
        ),
    },
    {
        "filename": "Angel_Vergara_Resume_AI_Workflow_Automation.pdf",
        "headline": "OPERATIONS-TO-AI WORKFLOW BUILDER | APPLIED AI WORKFLOWS & GOVERNED SYSTEMS",
        "profile": (
            "Hospitality operations-to-AI workflow builder focused on useful, human-controlled systems. Combines "
            "verified restaurant leadership and financial/administrative workflow ownership with working application "
            "and systems proof, structured outputs, review gates, exception handling, recovery logic, and clear "
            "implementation documentation. Builds from real operating friction rather than hypothetical process "
            "diagrams. English/Spanish bilingual capability supports training, documentation, and adoption."
        ),
        "strengths": (
            "AI-assisted workflow design | LLM API integration | prompt and structured-output design | "
            "human approval gates | multi-agent workflow architecture | process mapping | exception and recovery logic | "
            "evidence-backed review | product delivery | implementation documentation | hospitality operations | "
            "bilingual English/Spanish"
        ),
        "projects": [
            "Resale Scanner Pro - Private working personal AI-assisted application used in a small family resale workflow; "
            "built with React, TypeScript, Vite, Node/Express, Supabase, and Railway, with Gemini, Claude, "
            "marketplace/API integrations, automation, and GitHub delivery workflows. Private working-product evidence only; no live deployment or source link is included.",
            "Loft OS - Sanitized architecture case study: agentic workflows with scoped roles, human authorization, "
            "evidence-backed review, fail-closed controls, recovery paths, and deterministic closeout.",
            "Sous Chef - Public application: AI-assisted culinary workspace with authenticated recipe flows, pantry and "
            "inventory signals, cookbooks, and cooking-session history.",
        ],
        "experience": [
            (
                CAFE_LINGER_TITLE,
                [
                    "Became General Manager in Jan 2019 and owned day-to-day workflows spanning production, inventory, purchasing, vendors, staff training, reporting, compliance, and customer experience.",
                    "Worked with POS data, spreadsheets, invoices, payroll information, QuickBooks, P&L review, vendor pricing, and cash-flow-aware decisions - the operating problems now informing restaurant-automation concepts.",
                    "Continued paid account-closure, administrative, and restaurant-consulting work through Jan 2024 after restaurant operations ended in Dec 2022.",
                ],
            ),
            (
                FARM_HAUS_TITLE,
                [
                    "Began with kitchen-workflow consultation, then led production, ordering, inventory, quality, training, and service routines.",
                    "Worked directly with ownership on operating consistency and growth support.",
                ],
            ),
            (
                "Earlier Culinary Experience & Leadership | Florida and Massachusetts",
                [
                    "Progressed from line and pastry work into Sous Chef and Head Chef responsibilities across high-volume restaurants, openings, and hotel operations.",
                    "Built practical judgment around handoffs, exceptions, quality controls, inventory counts, ordering, training, and service recovery.",
                ],
            ),
        ],
        "tools": (
            "React | TypeScript | Vite | Tailwind | Node/Express | Railway | Supabase integration | "
            "Postgres/SQL exposure | Gemini | Claude API | marketplace APIs | GitHub Actions workflow exposure | Notion | n8n-style automation"
        ),
    },
]


# --- Structured emission for the public /resume/ HTML surface (TSK-966) ------
#
# SINGLE WRITER. The readable HTML resume and the downloadable General PDF are
# both derived from RESUMES[0] + EDUCATION above. Nothing downstream may keep a
# second, hand-maintained copy of this content. `--emit-json` writes the
# committed artifact, and tests/rendered-html.test.mjs re-runs this emitter and
# fails on any byte difference, so drift cannot silently create dual truth.
#
# PRIVACY. This artifact is a public-surface PROJECTION of the resume, not a full
# copy. The published site discloses no geography at all; the acceptance record
# (design-qa.md) pins "a phone number and city inside the resume PDFs only". So:
#   - the contact line (city, phone, email) is composed inside build_resume() and
#     is not part of RESUMES, so it cannot reach the HTML through this artifact;
#   - employer LOCATION segments are dropped here on purpose. The PDFs still carry
#     them from RESUMES; the public page must not introduce them.
# The privacy boundary is enforced at this single writer, and pinned by the
# no-geography control in tests/rendered-html.test.mjs.

GENERAL_RESUME_FILENAME = "Angel_Vergara_Resume_General.pdf"


def _pipe_parts(value: str) -> list[str]:
    return [part.strip() for part in value.split("|") if part.strip()]


# A resume date segment always carries a four-digit year ("May 2018-Dec 2022").
# A location segment ("Orlando, FL", "Florida and Massachusetts") never does.
_YEAR = re.compile(r"\b\d{4}\b")


def _dash_split(value: str) -> tuple[str, str]:
    head, separator, tail = value.partition(" - ")
    if not separator:
        return value.strip(), ""
    return head.strip(), tail.strip()


def general_resume_document() -> dict:
    """Deterministic structured view of the General Resume."""
    resume = next(item for item in RESUMES if item["filename"] == GENERAL_RESUME_FILENAME)

    experience = []
    for title, bullets in resume["experience"]:
        parts = _pipe_parts(title)
        organization, role = _dash_split(parts[0])
        experience.append(
            {
                "organization": organization,
                "role": role,
                # Dates only. Location segments are deliberately not projected onto
                # the public surface -- see the PRIVACY note above.
                "dates": [part for part in parts[1:] if _YEAR.search(part)],
                "bullets": list(bullets),
            }
        )

    projects = []
    for entry in resume["projects"]:
        name, summary = _dash_split(entry)
        projects.append({"name": name, "summary": summary})

    education = []
    for entry in EDUCATION:
        institution, credential = _dash_split(entry)
        education.append({"institution": institution, "credential": credential})

    return {
        "generated_by": "scripts/generate_resumes.py --emit-json",
        "source": f"RESUMES[0] / {GENERAL_RESUME_FILENAME}",
        "name": "Angel Vergara",
        "pdf": GENERAL_RESUME_FILENAME,
        "headline": resume["headline"],
        "profile": resume["profile"],
        "strengths": _pipe_parts(resume["strengths"]),
        "projects": projects,
        "experience": experience,
        "education": education,
        "tools": _pipe_parts(resume["tools"]),
    }


def general_resume_json() -> str:
    return json.dumps(general_resume_document(), indent=2, ensure_ascii=False) + "\n"


def styles():
    sample = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name",
            parent=sample["Title"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=23,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=2,
        ),
        "headline": ParagraphStyle(
            "Headline",
            parent=sample["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.6,
            leading=11.5,
            textColor=COBALT,
            alignment=TA_CENTER,
            tracking=0.3,
            spaceAfter=3,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=sample["Normal"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=9.6,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=4,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=sample["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=10.6,
            textColor=COPPER,
            tracking=0.7,
            spaceBefore=4,
            spaceAfter=1.6,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=8.6,
            leading=10.7,
            textColor=INK,
            spaceAfter=1.6,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=sample["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=10.9,
            textColor=INK,
            spaceBefore=1.8,
            spaceAfter=0.8,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=8.4,
            leading=10.4,
            leftIndent=10,
            firstLineIndent=-8,
            bulletIndent=0,
            textColor=INK,
            spaceAfter=0.9,
        ),
        "footer": ParagraphStyle(
            "Footer",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=7.4,
            leading=8.8,
            alignment=TA_CENTER,
            textColor=MUTED,
        ),
    }


def esc(text: str) -> str:
    """XML-escape plain text for reportlab Paragraph (bare '&' otherwise
    renders as a partial entity, e.g. 'P&L' -> 'P&L;')."""
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def bullet(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(f"- {esc(text)}", style)


def build_resume(resume: dict, destination: Path) -> None:
    style = styles()
    doc = SimpleDocTemplate(
        str(destination),
        pagesize=LETTER,
        rightMargin=0.46 * inch,
        leftMargin=0.46 * inch,
        topMargin=0.3 * inch,
        bottomMargin=0.28 * inch,
        title=f"Angel Vergara - {resume['headline'].title()}",
        author="Angel Vergara",
        subject="Resume",
    )

    contact = (
        "Orlando, Florida | Remote, U.S. | "
        '<link href="mailto:avergara13@me.com" color="#0B4CFF">avergara13@me.com</link> | '
        "407-432-6959 | "
        '<link href="https://avergara13.github.io/" color="#0B4CFF">Portfolio</link> | '
        '<link href="https://linkedin.com/in/angel-vergara-83861540" color="#0B4CFF">LinkedIn</link>'
    )

    story = [
        Paragraph("Angel Vergara", style["name"]),
        Paragraph(esc(resume["headline"]), style["headline"]),
        Paragraph(contact, style["contact"]),
        HRFlowable(width="100%", thickness=1.2, color=INK, spaceBefore=1, spaceAfter=2),
        Paragraph("PROFILE", style["section"]),
        Paragraph(esc(resume["profile"]), style["body"]),
        Paragraph("CORE STRENGTHS", style["section"]),
        Paragraph(esc(resume["strengths"]), style["body"]),
        Paragraph("SELECTED PRODUCT AND SYSTEMS WORK", style["section"]),
    ]
    story.extend(bullet(project, style["bullet"]) for project in resume["projects"])
    story.append(Paragraph("SELECTED PROFESSIONAL EXPERIENCE", style["section"]))
    for title, bullets in resume["experience"]:
        story.append(Paragraph(esc(title), style["role"]))
        story.extend(bullet(item, style["bullet"]) for item in bullets)

    story.extend(
        [
            Paragraph("EDUCATION", style["section"]),
            *[bullet(item, style["bullet"]) for item in EDUCATION],
            Paragraph("TOOLS", style["section"]),
            Paragraph(esc(resume["tools"]), style["body"]),
            Spacer(1, 2),
            HRFlowable(width="100%", thickness=0.5, color=LINE, spaceBefore=1, spaceAfter=2),
            Paragraph(
                'Work samples and case studies: <link href="https://avergara13.github.io/" color="#0B4CFF">avergara13.github.io</link>',
                style["footer"],
            ),
        ]
    )

    doc.build(story)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate portfolio resume PDFs.")
    parser.add_argument(
        "--only",
        action="append",
        dest="only",
        default=[],
        metavar="FILENAME",
        help="Generate only this PDF filename. Repeat for multiple files. Default: all resumes.",
    )
    parser.add_argument(
        "--emit-json",
        action="store_true",
        help=(
            "Emit the deterministic structured General Resume consumed by the /resume/ "
            "HTML surface instead of building PDFs. Uses no third-party packages."
        ),
    )
    parser.add_argument(
        "--stdout",
        action="store_true",
        help="With --emit-json, print to stdout instead of writing the committed artifact.",
    )
    args = parser.parse_args()
    if args.stdout and not args.emit_json:
        parser.error("--stdout is only meaningful with --emit-json")
    return args


def main() -> None:
    args = parse_args()

    if args.emit_json:
        payload = general_resume_json()
        if args.stdout:
            sys.stdout.write(payload)
        else:
            WEB_JSON_PATH.parent.mkdir(parents=True, exist_ok=True)
            WEB_JSON_PATH.write_text(payload, encoding="utf-8")
            print(WEB_JSON_PATH)
        return

    if not PDF_AVAILABLE:
        raise SystemExit(
            "reportlab is required to build the resume PDFs. Install it, or use "
            "--emit-json for the stdlib-only structured emission."
        )

    requested = set(args.only)
    known = {resume["filename"] for resume in RESUMES}
    unknown = requested - known
    if unknown:
        raise SystemExit(f"Unknown resume filename(s): {', '.join(sorted(unknown))}")

    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    ARCHIVE_DIR.mkdir(parents=True, exist_ok=True)
    for resume in RESUMES:
        if requested and resume["filename"] not in requested:
            continue
        public_path = PUBLIC_DIR / resume["filename"]
        archive_path = ARCHIVE_DIR / resume["filename"]
        build_resume(resume, public_path)
        archive_path.write_bytes(public_path.read_bytes())
        print(public_path)


if __name__ == "__main__":
    main()
