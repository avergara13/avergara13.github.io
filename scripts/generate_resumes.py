from __future__ import annotations

from pathlib import Path

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


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public" / "downloads"
ARCHIVE_DIR = ROOT / "output" / "pdf"

INK = colors.HexColor("#0B1533")
COBALT = colors.HexColor("#0B4CFF")
COPPER = colors.HexColor("#B63A1F")
MUTED = colors.HexColor("#505A6A")
LINE = colors.HexColor("#CED3DC")


COMMON_EXPERIENCE = [
    (
        "Cafe Linger | Executive Chef, May-Dec 2018 | General Manager, Jan 2019-Dec 2022",
        [
            "Led day-to-day work across production, purchasing, inventory, staff training, reporting, and customer experience.",
            "Built repeatable routines for ordering, preparation, quality, service readiness, and team handoffs.",
            "Continued paid closure administration and independent consulting through Jan 2024.",
        ],
    ),
    (
        "Kitchen and Production Leadership | Florida and Massachusetts",
        [
            "Coordinated teams, inventory, ordering, quality, and service execution in hands-on hospitality environments.",
            "Developed training practices and operating standards shaped by real production pressure and daily exceptions.",
        ],
    ),
]

EDUCATION = [
    "Florida International University - B.S., Hospitality Management; Minor, Beverage Management",
    "The Culinary Institute of America - A.S., Culinary Arts",
]

RESUMES = [
    {
        "filename": "Angel_Vergara_Resume_Implementation_Onboarding.pdf",
        "headline": "BILINGUAL HOSPITALITY OPERATIONS LEADER | IMPLEMENTATION & ONBOARDING",
        "profile": (
            "Bilingual hospitality operations leader and implementation-focused systems builder. "
            "Translates frontline complexity into clear workflows, usable tools, customer training, and accountable adoption. "
            "Hands-on proof includes a live decision-support product and employer-facing systems case studies."
        ),
        "strengths": (
            "Customer onboarding and training | workflow discovery | requirements gathering | configuration support | "
            "adoption and handoffs | documentation | exception handling | hospitality operations | stakeholder communication | "
            "English and Spanish"
        ),
        "projects": [
            "Resale Scanner Pro - Designed and shipped a live mobile-first product that turns item capture and market research into a human-reviewed sourcing and listing workflow.",
            "Loft OS - Documented a sanitized operating pattern for scoped work, human authorization, verification, recovery, and accountable closeout.",
            "Sous Chef - Built a public-source culinary workspace shaped by recipe, pantry, cookbook, and cooking-session workflows.",
        ],
        "tools": "Notion | spreadsheets | Git and GitHub | React | TypeScript | Node | Postgres | AI-assisted workflow design",
    },
    {
        "filename": "Angel_Vergara_Resume_Business_Systems_Operations.pdf",
        "headline": "BILINGUAL OPERATIONS LEADER | BUSINESS SYSTEMS & OPERATIONS",
        "profile": (
            "Bilingual operations leader and systems builder who turns operating problems into clear requirements, workflows, and usable tools. "
            "Combines frontline hospitality judgment with process mapping, reporting, documentation, and hands-on product delivery."
        ),
        "strengths": (
            "Business-process mapping | requirements gathering | workflow analysis | operational reporting | decision rules | "
            "exception handling | inventory and purchasing | vendor coordination | workforce routines | documentation | "
            "English and Spanish"
        ),
        "projects": [
            "Resale Scanner Pro - Shipped a live decision-support product with structured intake, market evidence, human review, and operating records.",
            "Loft OS - Documented a sanitized workflow pattern for scope, ownership, authorization, evidence, recovery, and closeout.",
            "The Office Chef - Framed a clearly labeled concept using simulated data to explore invoice intake, vendor changes, food cost, and owner-ready reporting.",
        ],
        "tools": "Spreadsheets | Notion | Postgres | Git and GitHub | React | TypeScript | Node | workflow and automation architecture",
    },
    {
        "filename": "Angel_Vergara_Resume_AI_Workflow_Automation.pdf",
        "headline": "OPERATIONS-TO-AI WORKFLOW BUILDER | SHIPPED PRODUCT & GOVERNED SYSTEMS",
        "profile": (
            "Bilingual operations-to-AI workflow builder focused on useful, human-controlled systems. "
            "Combines frontline operating judgment with shipped product work, structured outputs, review gates, exception handling, "
            "recovery logic, and clear implementation documentation."
        ),
        "strengths": (
            "AI-assisted workflow design | structured outputs | human approval gates | process mapping | exception and recovery logic | "
            "evidence-backed review | product delivery | technical documentation | stakeholder communication | English and Spanish"
        ),
        "projects": [
            "Resale Scanner Pro - Designed and shipped a live AI-assisted product connecting item capture, market evidence, human judgment, and outcome tracking.",
            "Loft OS - Documented a sanitized governed-work pattern with explicit scope, human authority, verification, recovery, and closeout.",
            "Sous Chef - Built a public-source culinary workspace that translates hospitality-domain workflows into an inspectable product surface.",
        ],
        "tools": "React | TypeScript | Node | Postgres | AI model APIs | Git and GitHub | Notion | workflow and automation design",
    },
]


def styles():
    sample = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name",
            parent=sample["Title"],
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=25,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=3,
        ),
        "headline": ParagraphStyle(
            "Headline",
            parent=sample["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.8,
            leading=12,
            textColor=COBALT,
            alignment=TA_CENTER,
            tracking=0.3,
            spaceAfter=4,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=sample["Normal"],
            fontName="Helvetica",
            fontSize=8.4,
            leading=10,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=5,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=sample["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=9.2,
            leading=11,
            textColor=COPPER,
            tracking=0.7,
            spaceBefore=5,
            spaceAfter=2,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=9,
            leading=11.4,
            textColor=INK,
            spaceAfter=2,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=sample["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9.3,
            leading=11.4,
            textColor=INK,
            spaceBefore=2,
            spaceAfter=1,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=8.7,
            leading=11,
            leftIndent=10,
            firstLineIndent=-8,
            bulletIndent=0,
            textColor=INK,
            spaceAfter=1.2,
        ),
        "footer": ParagraphStyle(
            "Footer",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=7.6,
            leading=9,
            alignment=TA_CENTER,
            textColor=MUTED,
        ),
    }


def bullet(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(f"- {text}", style)


def build_resume(resume: dict, destination: Path) -> None:
    style = styles()
    doc = SimpleDocTemplate(
        str(destination),
        pagesize=LETTER,
        rightMargin=0.48 * inch,
        leftMargin=0.48 * inch,
        topMargin=0.36 * inch,
        bottomMargin=0.32 * inch,
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
        Paragraph(resume["headline"], style["headline"]),
        Paragraph(contact, style["contact"]),
        HRFlowable(width="100%", thickness=1.2, color=INK, spaceBefore=1, spaceAfter=2),
        Paragraph("PROFILE", style["section"]),
        Paragraph(resume["profile"], style["body"]),
        Paragraph("CORE STRENGTHS", style["section"]),
        Paragraph(resume["strengths"], style["body"]),
        Paragraph("SELECTED PRODUCT AND SYSTEMS WORK", style["section"]),
    ]
    story.extend(bullet(project, style["bullet"]) for project in resume["projects"])
    story.append(Paragraph("SELECTED OPERATIONS EXPERIENCE", style["section"]))
    for title, bullets in COMMON_EXPERIENCE:
        story.append(Paragraph(title, style["role"]))
        story.extend(bullet(item, style["bullet"]) for item in bullets)

    story.extend(
        [
            Paragraph("EDUCATION", style["section"]),
            *[bullet(item, style["bullet"]) for item in EDUCATION],
            Paragraph("TOOLS", style["section"]),
            Paragraph(resume["tools"], style["body"]),
            Spacer(1, 3),
            HRFlowable(width="100%", thickness=0.5, color=LINE, spaceBefore=1, spaceAfter=3),
            Paragraph(
                'Work samples and case studies: <link href="https://avergara13.github.io/" color="#0B4CFF">avergara13.github.io</link>',
                style["footer"],
            ),
        ]
    )

    doc.build(story)


def main() -> None:
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    ARCHIVE_DIR.mkdir(parents=True, exist_ok=True)
    for resume in RESUMES:
        public_path = PUBLIC_DIR / resume["filename"]
        archive_path = ARCHIVE_DIR / resume["filename"]
        build_resume(resume, public_path)
        archive_path.write_bytes(public_path.read_bytes())
        print(public_path)


if __name__ == "__main__":
    main()
