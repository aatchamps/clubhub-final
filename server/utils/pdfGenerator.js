const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = async (student, event, host) => {
  return new Promise((resolve, reject) => {
    // Use the template's actual size
    const doc = new PDFDocument({ size: [1086, 768], margin: 0 });
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // Draw the background image (template)
    const templatePath = path.join(__dirname, "certificate_template.png");
    if (fs.existsSync(templatePath)) {
      doc.image(templatePath, 0, 0, { width: 1086, height: 768 });
    }

    // --- Certificate Content Placement ---

    // Student Name with USN (positioned well above the line in the template)
    doc
      .font("Times-Bold")
      .fontSize(40)
      .fillColor("#1a2340")
      .text(`${student.name.toUpperCase()} (${student.usn})`, 0, 350, {
        align: "center",
        width: 1086,
        characterSpacing: 1.5,
      });

    // Certificate paragraph (positioned below the line)
    const formattedDate = event.date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const certificateText = `This is to certify that the above named candidate has successfully participated in "${event.name}" held on ${formattedDate}. This certificate is awarded in appreciation of their active participation and dedication shown during the event.`;

    doc
      .font("Times-Roman")
      .fontSize(18)
      .fillColor("#2c3e50")
      .text(certificateText, 120, 490, {
        align: "justify",
        width: 846,
        lineGap: 6,
      });

    // Organizer signature section (bottom right)
    doc
      .font("Times-Roman")
      .fontSize(16)
      .fillColor("#1a2340")
      .text("Organized by", 750, 630, { width: 200, align: "center" });

    doc
      .font("Times-Bold")
      .fontSize(18)
      .fillColor("#1a2340")
      .text(host.orgName, 750, 650, { width: 200, align: "center" });

    // Add a subtle signature line above organizer
    doc
      .strokeColor("#ccc")
      .lineWidth(1)
      .moveTo(780, 645)
      .lineTo(920, 645)
      .stroke();

    doc.end();
  });
};
