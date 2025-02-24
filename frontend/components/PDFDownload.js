import jsPDF from 'jspdf';

const PDFDownload = ({ tasks }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text('Task List', 10, 10);

    doc.setFont("helvetica", "normal");
    tasks.forEach((task, index) => {
      const yPosition = 20 + index * 30;

      // Ensure dueDate is valid before formatting
      const formattedDate = task.dueDate && !isNaN(new Date(task.dueDate))
        ? new Date(task.dueDate).toLocaleDateString()
        : 'No Date';

      // Add task details to the PDF
      doc.text(`Task ${index + 1}: ${task.title}`, 10, yPosition);
      doc.text(`Status: ${task.status}`, 10, yPosition + 5);
      doc.text(`Description: ${task.description || 'No Description'}`, 10, yPosition + 10);
      doc.text(`Due Date: ${formattedDate}`, 10, yPosition + 15);

      // Add file URL or link to PDF if file exists
      if (task.fileUrl) {
        const fileLink = task.fileUrl.includes("uploads")
          ? `Download file: ${task.fileUrl}` // This will be the relative file path
          : 'No file attached';
        doc.text(fileLink, 10, yPosition + 20);
      }
    });

    doc.save('tasks.pdf');
  };

  return (
    <button onClick={generatePDF} className="bg-green-500 text-white p-2 rounded">
      Download PDF
    </button>
  );
};

export default PDFDownload;

