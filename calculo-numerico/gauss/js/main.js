/**
 * Created by thomaz on 28/08/16.
 */

$(function(){

    var rows = 0;
    var cols = 0;

    $('#form_row_col').on('submit', function(){
        doMatriz(Number($('#numLinhas').val()), Number($('#numColunas').val()));

        return false;
    });

    $('#bt_calcular').on('click', function(){

        // Obtem os valores
        var matriz = new Array(rows);
        for(var i = 0; i < rows; i++) {
            var mCol = new Array(cols);
            for(var j = 0; j < cols; j++) {
                mCol[j] = Number($('#field_' + i + '_' + j).val());
            }
            matriz[i] = mCol;
        }

        // Aplica gauss
        var m = 0;
        while( m < matriz.length ) {
            for(var i = m + 1; i < matriz.length; i++) {
                var multiplicador = matriz[i][m] / matriz[m][m];
                for(var j = 0; j < matriz[i].length; j++) {
                    var r = matriz[i][j] - (multiplicador * matriz[m][j]);

                    matriz[i][j] = r;
                }
            }
            m++;
        }

        // Escreve o resultado
        $('#wait_result').find('tbody').html('');
        for(var i = 0; i < matriz.length; i++) {
            var row = '<tr>';
            for(var j = 0; j < matriz[i].length; j++) {
                row += '<td>' + matriz[i][j] + '</td>';
            }
            row += '</tr>';

            $('#wait_result').find('tbody').append(row);
        }


    });

    function doMatriz(rowI, colI) {
        rows = rowI;
        cols = colI + 1;

        $('#wait_matriz').find('tbody').html('');
        for(var i = 0; i < rowI; i++) {
            var row = '<tr>';
            var j = 0;
            for(; j < colI; j++) {
                row += '<td style="background: #ccc">' +
                    '<input type="number" class="form-control" id="field_' + i + '_' + j + '">' +
                    '</td>';
            }
            row += '<td style="background: #b40000">' +
                '<input type="number" class="form-control" placeholder="=" id="field_' + i + '_' + j + '">' +
                '</td></tr>';

            $('#wait_matriz').find('tbody').append(row);
        }
    }

});