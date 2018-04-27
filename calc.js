var myindex = 0;

$(document).ready(function () {
    var parser = math.parser();

    if (myindex===0)//0번째 페이지
    {
        $("#p0").show();
        $("#s0").hide();

    }
    else if (myindex===1)//1번째 페이지
    {

    }
    var displayValue = '0';
    $('#ohoh').text(displayValue);//result에 결과물을 넣음
    $('#result').text(displayValue);//result에 결과물을 넣음
    $('#latex').html('$$' + math.parse(displayValue).toTex() + '$$');//latex에 넣는건가?

    $('.key').each(function (index, key) {
        $(this).click(function (e) {
            if (displayValue === '0') displayValue = '';

            if ($(this).text() === 'EV') {
                try {

                    displayValue = parser.eval(displayValue).toString();
                    var tokens = displayValue.split(' ');
                    if (tokens[0] === 'function') {
                        displayValue = tokens[0];
                    }
                    $('#result').text(displayValue);
                    displayValue = '0';
                } catch (err) {
                    displayValue = '0';
                    if (displayValue !== 'function') {
                        $('#result').text(err);
                    }
                }
            } else {
                if ($(this).text() === 'AC') {
                    displayValue = '0';
                    $('#result').text(displayValue);
                    $('#ohoh').text(displayValue);

                }
                else if ($(this).text() === 'res') {
                    // $("#p1").hide();
                }
                else if ($(this).text() === 'Shift') {
                    $("#p0").toggle();
                    $("#s0").toggle();

                }
                else if ($(this).text() === '☜') {
                    myindex--;
                }
                else if ($(this).text() === '☞') {
                    myindex++;
                }
                else if($(this).text() === 'DEL'){
                    posi = getCaretPosition(textbox);
                    if(displayValue.length>0 && posi.end != 0 && displayValue != ''){ // 빈문자열이 아니고 커서의 위치가 맨 앞이 아닐 경우
                        var str="";
                        if(posi.start==posi.end){ // 한문자만 삭제하는 경우
                            str = displayValue.substring(0, posi.start-1);
                            len = 1;
                        }
                        else{ // 드래그 영역을 삭제하는 경우
                            str = displayValue.substring(0, posi.start);
                            len = 0;
                        }
                        str += displayValue.substring(posi.end, displayValue.length);
                        displayValue = str;
                        hisSave(displayValue, resultValue);
                        $('#display').text(displayValue);
                        setCaretPosition(textbox, 0, posi.start-len, posi.start-len);
                    }
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