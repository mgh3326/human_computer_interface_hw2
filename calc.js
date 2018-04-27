$(document).ready(function () {
    var parser = math.parser();

    var displayValue = '0';
    $('#ohoh').text(displayValue);//result에 결과물을 넣음
    $('#result').text(displayValue);//result에 결과물을 넣음
    $('#latex').html('$$' + math.parse(displayValue).toTex() + '$$');//latex에 넣는건가?

    $('.key').each(function (index, key) {
        $(this).click(function (e) {
            if (displayValue == '0') displayValue = '';

            if ($(this).text() == 'EV') {
                try {

                    displayValue = parser.eval(displayValue).toString();
                    var tokens = displayValue.split(' ');
                    if (tokens[0] == 'function') {
                        displayValue = tokens[0];
                    }
                    $('#result').text(displayValue);
                    displayValue = '0';
                } catch (e) {
                    displayValue = '0';
                    if (displayValue != 'function') {
                        $('#result').text(e);
                    }
                }
            } else {
                if ($(this).text() == 'CL') {
                    displayValue = '0';
                    $('#result').text(displayValue);
                    $('#ohoh').text(displayValue);

                }
                else if ($(this).text() == 'res') {
                    $("#p1").hide();
                }
                else {
                    displayValue += $(this).text();
                    $('#ohoh').text(displayValue);

                }

            }

            e.preventDefault();
        });
    });
});