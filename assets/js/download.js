async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const resume = document.getElementById("resumeBox");

  if (!resume) {
    alert("❌ Resume element not found!");
    return;
  }

  try {
    const canvas = await html2canvas(resume, {
      scale: 2, 
      useCORS: true, 
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 0;

    if (imgHeight > pageHeight) {
      let heightLeft = imgHeight;

      while (heightLeft > 0) {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        if (heightLeft > 0) {
          pdf.addPage();
          position = 0;
        }
      }
    } else {
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    }

    pdf.save("Resume.pdf");
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    alert("Something went wrong while generating the PDF.");
  }
}

document.getElementById("downloadBtn").addEventListener("click", downloadPDF);
