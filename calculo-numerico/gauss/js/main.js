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
		
		
		/*
    	for(int i = n - 1; i != -1; i--){
            if (i == (n - 1)) {
                sltn[i] = (matrix[i][buffer - 1]) / matrix[i][i];
            } else {
                sltn[i] = (matrix[i][buffer - 1] - somatoria(i)) / matrix[i][i];
            }
        }			
			
		*/
		var n = matriz.length;
		var sltn = new Array(n);
    	for(var i = n - 1; i != -1; i--){
			if (i == (n - 1)) {
				sltn[i] = (matriz[i][cols - 1]) / matriz[i][i];
			} else {
		        
				var somatorio = 0;
				for(var j = i + 1; j != n; j++){
		           	somatorio += (matriz[i][j])*sltn[j];
		        }
				
				
				sltn[i] = (matriz[i][cols - 1] - somatorio) / matriz[i][i];
			}
		}
		
		$('#val1').text(sltn[0]);
		$('#val2').text(sltn[1]);
		$('#val3').text(sltn[2]);
			

        // Escreve o resultado
        $('#wait_result').find('tbody').html('');
        for(var i = 0; i < matriz.length; i++) {
            var row = '<tr>';
            for(var j = 0; j < matriz[i].length; j++) {
                if( j + 1 == matriz[i].length ) {
                    row += '<td style="background: #b40000;"><font color="white">' + Math.round(matriz[i][j]) + '</font></td>';
                } else {
                    row += '<td>' + Math.round(matriz[i][j]) + '</td>';
                }
            }
            row += '</tr>';

            $('#wait_result').find('tbody').append(row);
        }


    });

/*
	
    public double somatoria(int i){
        double somatoria = 0;
        for(int j = i + 1; j != n; j++){
                somatoria += (matrix[i][j])*sltn[j];
        }
        return somatoria;
    }
	
*/ 



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