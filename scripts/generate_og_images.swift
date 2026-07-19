import AppKit
import Foundation

struct SocialCard {
    let filename: String
    let label: String
    let title: String
    let subtitle: String
    let accent: NSColor
}

let cards = [
    SocialCard(filename: "og-home.png", label: "IMPLEMENTATION & ONBOARDING", title: "Systems teams can actually adopt.", subtitle: "Bilingual operations leadership, practical implementation systems, and shipped product proof.", accent: NSColor(calibratedRed: 0.04, green: 0.30, blue: 1.0, alpha: 1)),
    SocialCard(filename: "og-resume.png", label: "RESUME SUITE", title: "One career. Three clear views.", subtitle: "Implementation & Onboarding · Business Systems & Operations · AI Workflow & Automation", accent: NSColor(calibratedRed: 0.71, green: 0.23, blue: 0.12, alpha: 1)),
    SocialCard(filename: "og-hiring.png", label: "FOR HIRING TEAMS", title: "Operations credibility. Implementation discipline.", subtitle: "A concise path from role fit to proof and direct conversation.", accent: NSColor(calibratedRed: 0.04, green: 0.30, blue: 1.0, alpha: 1)),
    SocialCard(filename: "og-resale-scanner-pro.png", label: "SHIPPED PRODUCT", title: "Resale Scanner Pro", subtitle: "A public, operational decision-support workflow with visible human judgment and outcome evidence.", accent: NSColor(calibratedRed: 0.05, green: 0.50, blue: 0.30, alpha: 1)),
    SocialCard(filename: "og-loft-os.png", label: "SANITIZED ARCHITECTURE", title: "Loft OS", subtitle: "A governed operating pattern for scope, authority, evidence, repair, and accountable closeout.", accent: NSColor(calibratedRed: 0.71, green: 0.23, blue: 0.12, alpha: 1)),
    SocialCard(filename: "og-sous-chef.png", label: "PUBLIC SOURCE CASE STUDY", title: "Sous Chef", subtitle: "Hospitality-domain judgment translated into recipes, pantry signals, cookbooks, and session continuity.", accent: NSColor(calibratedRed: 0.04, green: 0.30, blue: 1.0, alpha: 1)),
    SocialCard(filename: "og-office-chef.png", label: "CONCEPT · SIMULATED DATA", title: "The Office Chef", subtitle: "Restaurant back-office discovery and requirements made tangible without inflated delivery claims.", accent: NSColor(calibratedRed: 0.71, green: 0.23, blue: 0.12, alpha: 1)),
]

let width = 1200
let height = 630
let output = URL(fileURLWithPath: FileManager.default.currentDirectoryPath).appendingPathComponent("public")

func draw(_ text: String, in rect: NSRect, font: NSFont, color: NSColor, lineHeight: CGFloat? = nil) {
    let paragraph = NSMutableParagraphStyle()
    paragraph.lineBreakMode = .byWordWrapping
    if let lineHeight {
        paragraph.minimumLineHeight = lineHeight
        paragraph.maximumLineHeight = lineHeight
    }
    let attributes: [NSAttributedString.Key: Any] = [
        .font: font,
        .foregroundColor: color,
        .paragraphStyle: paragraph,
    ]
    NSAttributedString(string: text, attributes: attributes).draw(with: rect, options: [.usesLineFragmentOrigin, .usesFontLeading])
}

for card in cards {
    guard let bitmap = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: width,
        pixelsHigh: height,
        bitsPerSample: 8,
        samplesPerPixel: 4,
        hasAlpha: true,
        isPlanar: false,
        colorSpaceName: .deviceRGB,
        bytesPerRow: 0,
        bitsPerPixel: 0
    ) else { fatalError("Unable to create image buffer") }

    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)

    let canvas = NSRect(x: 0, y: 0, width: width, height: height)
    NSColor(calibratedRed: 0.96, green: 0.95, blue: 0.92, alpha: 1).setFill()
    canvas.fill()

    NSColor(calibratedRed: 0.04, green: 0.08, blue: 0.20, alpha: 1).setFill()
    NSRect(x: 790, y: 0, width: 410, height: 630).fill()
    card.accent.setFill()
    NSRect(x: 0, y: 0, width: 18, height: 630).fill()
    NSRect(x: 790, y: 0, width: 8, height: 630).fill()

    draw("Angel Vergara", in: NSRect(x: 66, y: 548, width: 650, height: 44), font: NSFont(name: "Georgia", size: 28) ?? .boldSystemFont(ofSize: 28), color: NSColor(calibratedRed: 0.04, green: 0.08, blue: 0.20, alpha: 1))
    draw(card.label, in: NSRect(x: 66, y: 484, width: 660, height: 30), font: .boldSystemFont(ofSize: 17), color: card.accent)
    draw(card.title, in: NSRect(x: 66, y: 242, width: 660, height: 220), font: NSFont(name: "Georgia", size: 68) ?? .boldSystemFont(ofSize: 68), color: NSColor(calibratedRed: 0.04, green: 0.08, blue: 0.20, alpha: 1), lineHeight: 72)
    draw(card.subtitle, in: NSRect(x: 66, y: 84, width: 650, height: 130), font: .systemFont(ofSize: 25, weight: .regular), color: NSColor(calibratedRed: 0.25, green: 0.29, blue: 0.36, alpha: 1), lineHeight: 34)

    draw("PORTFOLIO", in: NSRect(x: 848, y: 485, width: 270, height: 28), font: .boldSystemFont(ofSize: 17), color: NSColor(calibratedRed: 0.61, green: 0.70, blue: 0.93, alpha: 1))
    draw("Operations → systems", in: NSRect(x: 848, y: 346, width: 270, height: 96), font: NSFont(name: "Georgia", size: 38) ?? .boldSystemFont(ofSize: 38), color: .white, lineHeight: 45)
    draw("Clear workflows\nVisible decisions\nUsable delivery proof", in: NSRect(x: 848, y: 136, width: 280, height: 150), font: .systemFont(ofSize: 22, weight: .medium), color: NSColor(calibratedWhite: 0.86, alpha: 1), lineHeight: 38)
    draw("avergara13.github.io", in: NSRect(x: 848, y: 64, width: 290, height: 28), font: .monospacedSystemFont(ofSize: 17, weight: .semibold), color: NSColor(calibratedWhite: 0.70, alpha: 1))

    NSGraphicsContext.restoreGraphicsState()

    guard let data = bitmap.representation(using: .png, properties: [:]) else { fatalError("Unable to encode PNG") }
    try data.write(to: output.appendingPathComponent(card.filename))
    print(card.filename)
}
