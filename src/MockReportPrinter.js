MockReportPrinter = function() {
    var printedText = "";

    this.print = function (text) {
        printedText += text;
    };

    this.getText = function() {
        return printedText;
    };
};
