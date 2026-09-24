#!/usr/bin/env python3
"""
Generates an Executive Luxury PDF Quotation for the Aurelle E-Commerce Flagship in INR.
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

def build_pdf(filename="Aurelle_Luxe_Store_Official_Quotation_INR.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40,
    )

    styles = getSampleStyleSheet()
    
    # Custom Luxury Typography Styles
    gold_color = colors.HexColor("#C8A75A")
    graphite_color = colors.HexColor("#1C1C26")
    mist_color = colors.HexColor("#6D6A8C")
    light_bg = colors.HexColor("#F8F7FA")
    border_color = colors.HexColor("#E2DFED")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=graphite_color,
        textTransform='uppercase',
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=gold_color,
        letterSpacing=1.5,
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=graphite_color,
    )

    body_muted = ParagraphStyle(
        'BodyMuted',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=mist_color,
    )

    h2_style = ParagraphStyle(
        'Heading2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=graphite_color,
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.white,
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=graphite_color,
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=graphite_color,
    )

    table_cell_right = ParagraphStyle(
        'TableCellRight',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        alignment=TA_RIGHT,
        textColor=graphite_color,
    )

    elements = []

    # 1. Header Bar: Brand Wordmark + Document Metadata
    header_data = [
        [
            Paragraph("<b>AURELLE</b><br/><font color='#C8A75A' size='8'>HYGIENE HARDWARE • COMMERCIAL PROPOSAL</font>", title_style),
            Paragraph("<b>QUOTATION #:</b> QTN-AUR-2026-0925<br/><b>DATE:</b> September 25, 2026<br/><b>VALIDITY:</b> 30 Days<br/><b>CURRENCY:</b> INR (₹)", table_cell_right)
        ]
    ]
    header_table = Table(header_data, colWidths=[320, 212])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
    ]))
    elements.append(header_table)
    elements.append(HRFlowable(width="100%", thickness=2, color=gold_color, spaceBefore=4, spaceAfter=14))

    # 2. Client & Developer Information
    client_info_data = [
        [
            Paragraph("<b>PREPARED FOR (CLIENT):</b><br/><b>Brand:</b> Aurelle / Siddhi Website<br/><b>Project:</b> Luxury 3D D2C Flagship Web Platform<br/><b>Location:</b> India", table_cell_style),
            Paragraph("<b>DEVELOPER / CREATIVE TECHNOLOGIST:</b><br/><b>Name:</b> Krishna Mathur<br/><b>Role:</b> Senior Creative Technologist & Full-Stack Lead<br/><b>Delivery:</b> GitHub & Vercel Edge Production", table_cell_style),
        ]
    ]
    client_table = Table(client_info_data, colWidths=[266, 266])
    client_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), light_bg),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('PADDING', (0,0), (-1,-1), 10),
    ]))
    elements.append(client_table)
    elements.append(Spacer(1, 14))

    # 3. Project Scope Overview
    elements.append(Paragraph("PROJECT SCOPE & OBJECTIVE", h2_style))
    elements.append(Spacer(1, 4))
    elements.append(Paragraph(
        "Design, engineering, and turnkey deployment of a bespoke, award-winning 3D WebGL D2C e-commerce website for <b>Aurelle Hygiene Hardware</b>. Built with high-performance Three.js, React, TypeScript, and Vite. Includes 1:1 photorealistic physical product replication (Photo 3 exact hardware match), visionOS floating UI gallery, interactive checkout engine, sub-second load times, and 100% mobile responsive optimization across all modern smartphone devices worldwide.",
        body_style
    ))
    elements.append(Spacer(1, 14))

    # 4. Itemized Deliverables & Pricing Breakdown Table
    elements.append(Paragraph("ITEMIZED DELIVERABLES & COMMERCIAL BREAKDOWN", h2_style))
    elements.append(Spacer(1, 6))

    items_data = [
        [
            Paragraph("PHASE / SCOPE MODULE", table_header_style),
            Paragraph("SPECIFICATION & DELIVERABLES", table_header_style),
            Paragraph("AMOUNT (INR)", table_header_style),
        ],
        [
            Paragraph("<b>Phase 1: Creative Direction & Luxury Design System</b>", table_cell_bold),
            Paragraph("• Curated porcelain, alabaster mist, and brushed champagne gold palette<br/>• Editorial typographic hierarchy (Instrument Sans & Bricolage Grotesque)<br/>• Award-winning boutique refresh/entry preloader animation with progress telemetry<br/>• Glassmorphism tokens, micro-interactions, and visual design assets", table_cell_style),
            Paragraph("₹45,000", table_cell_right),
        ],
        [
            Paragraph("<b>Phase 2: Custom 3D WebGL Real-Time Hardware Studio</b>", table_cell_bold),
            Paragraph("• 1:1 Physical CAD reconstruction matching real hardware (Photo 3):<br/>  - Vertical rectangular dock with raised Champagne Gold perimeter bezel<br/>  - Flat-rectangular wand shaft with top suspension eyelet & gold thumb slider<br/>• Interactive 360° orbital drag & touch rotation with zero latency<br/>• Real-time lighting simulator (Daylight / Sunset Evening warm ambience)<br/>• 4 Architectural wall tile surfaces (Travertine, Fluted Marble, Slate, Terrazzo)<br/>• 3D Tri-Layer Capsule Pod with animated micro-bubbles & 8K Macro toggle", table_cell_style),
            Paragraph("₹95,000", table_cell_right),
        ],
        [
            Paragraph("<b>Phase 3: High-Converting Indian D2C Commerce Engine</b>", table_cell_bold),
            Paragraph("• 6-digit Indian PIN code logistics validation with city auto-detection<br/>• Multi-tiered bundle selector with automatic household savings calculator<br/>• Slide-out Cart Drawer with dynamic live tax & free BlueDart air shipping rules<br/>• Frictionless Checkout page (Cash on Delivery ₹0 fee, Instant UPI, & Card modes)<br/>• Dynamic Order ID generation (#AUR-XXXXX) & WhatsApp order notification flow", table_cell_style),
            Paragraph("₹65,000", table_cell_right),
        ],
        [
            Paragraph("<b>Phase 4: Symmetrical Editorial Gallery & Mobile Optimization</b>", table_cell_bold),
            Paragraph("• Symmetrical 2-column architectural gallery with matching 520px height<br/>• Floating visionOS glassmorphism dock with 7 high-res setting previews<br/>• Fullscreen 4K photo lightbox zoom modal<br/>• 100% mobile-friendly responsive layout tested for iPhone, Android, & iPad<br/>• Safe-area inset bottom padding for iOS home indicator bars with zero page overflow", table_cell_style),
            Paragraph("₹45,000", table_cell_right),
        ],
        [
            Paragraph("<b>Phase 5: Cloud Deployment, Version Control & Handover</b>", table_cell_bold),
            Paragraph("• Git version control repository setup & commit history on GitHub<br/>• Global edge production deployment on Vercel CDN with SSL encryption<br/>• Complete source code handover, comprehensive documentation, and launch guide", table_cell_style),
            Paragraph("₹30,000", table_cell_right),
        ],
        [
            Paragraph("<b>SUBTOTAL</b>", table_cell_bold),
            Paragraph("Comprehensive Production Package (All 5 Phases)", table_cell_style),
            Paragraph("<b>₹2,80,000</b>", table_cell_right),
        ],
        [
            Paragraph("<b>PRE-LAUNCH COMMERCIAL DISCOUNT</b>", table_cell_bold),
            Paragraph("Special preferred rate for initial brand launch", table_cell_style),
            Paragraph("<font color='#2F7D6B'><b>- ₹15,000</b></font>", table_cell_right),
        ],
        [
            Paragraph("<b>TOTAL COMMERCIAL INVESTMENT (NET)</b>", table_header_style),
            Paragraph("<b>Turnkey Flagship Production Ready for Immediate Use</b>", table_header_style),
            Paragraph("<b>₹2,65,000 INR</b>", table_header_style),
        ],
    ]

    items_table = Table(items_data, colWidths=[150, 282, 100])
    items_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), graphite_color),
        ('ALIGN', (2,0), (2,-1), 'RIGHT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-2), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 6),
        ('BACKGROUND', (0,-1), (-1,-1), graphite_color),
        ('LINEBELOW', (0,-1), (-1,-1), 1.5, gold_color),
        ('BACKGROUND', (0,-3), (-1,-3), light_bg),
        ('BACKGROUND', (0,-2), (-1,-2), light_bg),
    ]))
    elements.append(items_table)
    elements.append(Spacer(1, 14))

    # 5. Payment Terms & Bank Details
    terms_content = [
        Paragraph("<b>MILESTONE PAYMENT SCHEDULE:</b>", h2_style),
        Paragraph("• <b>40% Project Advance (₹1,06,000 INR):</b> Upon agreement and kickoff of 3D modeling and architecture.<br/>• <b>40% Milestone Completion (₹1,06,000 INR):</b> Upon review and signoff of interactive 3D WebGL & checkout prototype.<br/>• <b>20% Final Handover (₹53,000 INR):</b> Upon live deployment to Vercel and transfer of GitHub repository ownership.", body_style),
        Spacer(1, 10),
        Paragraph("<b>PAYMENT METHODS ACCEPTED:</b> Direct Bank NEFT / RTGS / IMPS / Instant UPI", body_style),
    ]
    elements.append(KeepTogether(terms_content))
    elements.append(Spacer(1, 14))

    # 6. Signoff / Approval Section
    sign_data = [
        [
            Paragraph("<b>PROPOSED BY:</b><br/><br/>_____________________________________<br/><b>Krishna Mathur</b><br/>Lead Creative Technologist & Engineer<br/>Date: 25/09/2026", body_style),
            Paragraph("<b>ACCEPTED & CONFIRMED BY (CLIENT):</b><br/><br/>_____________________________________<br/><b>Authorized Representative</b><br/>Aurelle / Siddhi Website<br/>Date: ________________________", body_style),
        ]
    ]
    sign_table = Table(sign_data, colWidths=[266, 266])
    sign_table.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.5, border_color),
        ('BACKGROUND', (0,0), (-1,-1), light_bg),
        ('PADDING', (0,0), (-1,-1), 12),
    ]))
    elements.append(sign_table)

    doc.build(elements)
    print(f"Quotation PDF generated successfully: {filename}")

if __name__ == "__main__":
    build_pdf()
