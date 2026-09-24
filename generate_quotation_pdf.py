#!/usr/bin/env python3
"""
Generates an Executive Luxury PDF Quotation for the Aurelle E-Commerce Flagship in INR.
Updated for Streamlined 7-Day Rapid Launch Commercial Package at ₹1,95,000 INR Net.
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
        rightMargin=36,
        leftMargin=36,
        topMargin=32,
        bottomMargin=32,
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
        fontSize=18,
        leading=22,
        textColor=graphite_color,
        textTransform='uppercase',
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=graphite_color,
    )

    h2_style = ParagraphStyle(
        'Heading2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=graphite_color,
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white,
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=graphite_color,
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=graphite_color,
    )

    table_cell_right = ParagraphStyle(
        'TableCellRight',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        alignment=TA_RIGHT,
        textColor=graphite_color,
    )

    elements = []

    # 1. Header Bar: Brand Wordmark + Document Metadata
    header_data = [
        [
            Paragraph("<b>AURELLE</b><br/><font color='#C8A75A' size='8'>HYGIENE HARDWARE • STREAMLINED 7-DAY COMMERCIAL QUOTATION</font>", title_style),
            Paragraph("<b>QUOTATION #:</b> QTN-AUR-2026-0925-RAPID<br/><b>DATE:</b> September 25, 2026<br/><b>VALIDITY:</b> 15 Days<br/><b>PACKAGE:</b> Rapid Launch (₹1,95,000 INR)", table_cell_right)
        ]
    ]
    header_table = Table(header_data, colWidths=[330, 210])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    elements.append(header_table)
    elements.append(HRFlowable(width="100%", thickness=2, color=gold_color, spaceBefore=4, spaceAfter=10))

    # 2. Client & Developer Information
    client_info_data = [
        [
            Paragraph("<b>PREPARED FOR (CLIENT):</b><br/><b>Brand:</b> Aurelle / Siddhi Website<br/><b>Project:</b> Luxury 3D D2C Flagship Web Platform<br/><b>Target Turnaround:</b> 7 Calendar Days", table_cell_style),
            Paragraph("<b>DEVELOPER / CREATIVE TECHNOLOGIST:</b><br/><b>Name:</b> Krishna Mathur<br/><b>Role:</b> Senior Creative Technologist & Full-Stack Lead<br/><b>Delivery:</b> GitHub & Vercel Edge Production", table_cell_style),
        ]
    ]
    client_table = Table(client_info_data, colWidths=[270, 270])
    client_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), light_bg),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    elements.append(client_table)
    elements.append(Spacer(1, 10))

    # 3. Project Scope Overview
    elements.append(Paragraph("EXECUTIVE PROJECT SCOPE & ARCHITECTURE", h2_style))
    elements.append(Spacer(1, 3))
    elements.append(Paragraph(
        "Complete turnkey design, engineering, and deployment of a luxury D2C e-commerce platform for <b>Aurelle Hygiene Hardware</b>. Features 1:1 photorealistic physical product replication matching client hardware (Photo 3), high-performance 3D WebGL configurator, top running announcement marquee ('The running things' ticker), 'Visual Stories Unfold' shoppable video reels with patron UGC upload (+₹500 voucher loop), and a conversion-optimized Cart Drawer (milestone progress, 6-digit PIN delivery estimator, 1-click upsells) with zero empty space.",
        body_style
    ))
    elements.append(Spacer(1, 10))

    # 4. Itemized Deliverables & Pricing Breakdown Table
    elements.append(Paragraph("ITEMIZED DELIVERABLES & COMMERCIAL BREAKDOWN", h2_style))
    elements.append(Spacer(1, 4))

    items_data = [
        [
            Paragraph("SCOPE MODULE", table_header_style),
            Paragraph("KEY SPECIFICATION & DELIVERABLES", table_header_style),
            Paragraph("AMOUNT (INR)", table_header_style),
        ],
        [
            Paragraph("<b>1. Creative Direction & Brand System</b>", table_cell_bold),
            Paragraph("• Curated porcelain, alabaster mist, and brushed champagne gold palette<br/>• Award-winning boutique refresh/entry preloader animation<br/>• Top infinite running announcement marquee ('the running things' ticker)", table_cell_style),
            Paragraph("₹35,000", table_cell_right),
        ],
        [
            Paragraph("<b>2. 3D WebGL Real-Time Hardware Studio</b>", table_cell_bold),
            Paragraph("• 1:1 CAD reconstruction matching physical product (Photo 3):<br/>  - Rectangular dock with raised Champagne Gold perimeter bezel<br/>  - Flat-rectangular wand with suspension eyelet & gold thumb slider<br/>• Real-time daylight/sunset lighting & 4 luxury wall surfaces", table_cell_style),
            Paragraph("₹65,000", table_cell_right),
        ],
        [
            Paragraph("<b>3. Shoppable 'Visual Stories' Video Reels</b>", table_cell_bold),
            Paragraph("• 4-card 9:16 vertical video reel player with real MP4 streaming<br/>• Interactive timeline scrubber, sound toggle, & full-screen lightbox<br/>• Patron UGC review video upload engine with instant ₹500 voucher reward", table_cell_style),
            Paragraph("₹40,000", table_cell_right),
        ],
        [
            Paragraph("<b>4. Gap-Free Cart Drawer & Checkout Engine</b>", table_cell_bold),
            Paragraph("• Milestone rewards progress bar with live unlockable gifts<br/>• 3 curated 1-click companion add-ons (+₹699 refill pack, ₹199 3M mount, ₹499 jar)<br/>• 6-digit Indian PIN code delivery & COD checker with BlueDart Air ETA<br/>• Instant ₹100 prepaid UPI discount & 4-pillar trust guarantee badges", table_cell_style),
            Paragraph("₹40,000", table_cell_right),
        ],
        [
            Paragraph("<b>5. Edge Deployment & Source Handover</b>", table_cell_bold),
            Paragraph("• Commit history pushed to GitHub (krish2105/Siddhi-website)<br/>• Global edge production deployment on Vercel with SSL encryption<br/>• 100% mobile-friendly responsive layout across iPhone & Android", table_cell_style),
            Paragraph("₹25,000", table_cell_right),
        ],
        [
            Paragraph("<b>STANDARD TOTAL</b>", table_cell_bold),
            Paragraph("Comprehensive 5-Module Production Package", table_cell_style),
            Paragraph("<b>₹2,05,000</b>", table_cell_right),
        ],
        [
            Paragraph("<b>RAPID 7-DAY SIGN-OFF DISCOUNT</b>", table_cell_bold),
            Paragraph("Special preferred pre-launch rate for prompt 7-day kickoff", table_cell_style),
            Paragraph("<font color='#2F7D6B'><b>- ₹10,000</b></font>", table_cell_right),
        ],
        [
            Paragraph("<b>NET COMMERCIAL INVESTMENT</b>", table_header_style),
            Paragraph("<b>Turnkey Flagship Ready for Immediate Brand Monetization</b>", table_header_style),
            Paragraph("<b>₹1,95,000 INR</b>", table_header_style),
        ],
    ]

    items_table = Table(items_data, colWidths=[150, 290, 100])
    items_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), graphite_color),
        ('ALIGN', (2,0), (2,-1), 'RIGHT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-2), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 5),
        ('BACKGROUND', (0,-1), (-1,-1), graphite_color),
        ('LINEBELOW', (0,-1), (-1,-1), 1.5, gold_color),
        ('BACKGROUND', (0,-3), (-1,-3), light_bg),
        ('BACKGROUND', (0,-2), (-1,-2), light_bg),
    ]))
    elements.append(items_table)
    elements.append(Spacer(1, 10))

    # 5. Payment Terms & Bank Details
    terms_content = [
        Paragraph("<b>MILESTONE PAYMENT SCHEDULE (7-DAY TURNAROUND):</b>", h2_style),
        Paragraph("• <b>50% Upfront Kickoff (₹97,500 INR):</b> Upon commercial agreement and project initiation.<br/>• <b>30% Beta Milestone (₹58,500 INR):</b> Upon review of 3D WebGL studio, video reels & interactive cart drawer.<br/>• <b>20% Final Handover (₹39,000 INR):</b> Upon live deployment to Vercel and transfer of GitHub repository ownership.", body_style),
        Spacer(1, 6),
        Paragraph("<b>PAYMENT MODES:</b> Direct Bank NEFT / RTGS / IMPS / Instant UPI (GPay / PhonePe / Paytm)", body_style),
    ]
    elements.append(KeepTogether(terms_content))
    elements.append(Spacer(1, 10))

    # 6. Signoff / Approval Section
    sign_data = [
        [
            Paragraph("<b>PROPOSED BY:</b><br/><br/>_____________________________________<br/><b>Krishna Mathur</b><br/>Lead Creative Technologist & Engineer<br/>Date: 25/09/2026", body_style),
            Paragraph("<b>ACCEPTED & CONFIRMED BY (CLIENT):</b><br/><br/>_____________________________________<br/><b>Authorized Representative</b><br/>Aurelle / Siddhi Website<br/>Date: ________________________", body_style),
        ]
    ]
    sign_table = Table(sign_data, colWidths=[270, 270])
    sign_table.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.5, border_color),
        ('BACKGROUND', (0,0), (-1,-1), light_bg),
        ('PADDING', (0,0), (-1,-1), 10),
    ]))
    elements.append(sign_table)

    doc.build(elements)
    print(f"Quotation PDF generated successfully: {filename}")

if __name__ == "__main__":
    build_pdf()
