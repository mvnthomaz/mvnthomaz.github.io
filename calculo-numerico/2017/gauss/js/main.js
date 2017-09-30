/**
 * Created by thomaz on 28/08/16.
 */

$(function(){

    var rows = 0;
    var cols = 0;

    $('#form_row_col').on('submit', function(){
        doMatriz(Number($('#numLinhas').val()));

        return false;
    });

    $('#bt_calcular').on('click', function(){
        
        /*
        var items = [
                [3, 2, 0, 1, 3], // 0 
                [9, 8, -3, 4, 6 ], // 1
                [6,-6,3,-7,-16],
                [3,-8,3,-8,22]// 2
            ];
        */
        
        // Obtem os valores
        var matriz = new Array(rows);
        for(var i = 0; i < rows; i++) {
            var mCol = new Array(cols);
            for(var j = 0; j < cols; j++) {
                mCol[j] = Number($('#field_' + i + '_' + j).val());
                // mCol[j] = items[i][j];
                
                // $('#field_' + i + '_' + j).val(items[i][j]);
            }
            matriz[i] = mCol;
        }

        // Aplica gauss
        var m = 0;
        while( m < matriz.length ) {
            for(var i = m + 1; i < matriz.length; i++) { // linha

                if( matriz[m][m] == 0 ) {
                    matriz = comutarLinha(matriz, m, i);
                }
                
                var multiplicador = matriz[i][m] / matriz[m][m];
                
                for(var j = 0; j < matriz[i].length; j++) { // coluna
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
        
        
        
        var thead = "";
        var tbody = "";
        
        $('#table_x').find('thead').html('');
        
        $('#table_x').find('tbody').html('');
        
		var n = matriz.length;
		var sltn = new Array(n);
        var i1 = 1;
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
            
            thead += '<th>X' + (i1++) + '</th>';
            tbody += '<td>' + Math.round(sltn[i]) + '</td>';
		}
        
        thead = '<tr>' + thead + '</tr>';
        tbody = '<tr>' + tbody + '</tr>';
		
        $('#table_x').find('thead').append(thead);
        
        $('#table_x').find('tbody').append(tbody);
        


        // Escreve o resultado
        $('#wait_result').find('tbody').html('');
        for(var i = 0; i < matriz.length; i++) {
            var row = '<tr>';
            for(var j = 0; j < matriz[i].length; j++) {
                if( j + 1 == matriz[i].length ) {
                    row += '<td style="background: #000000;"><font color="white">' + /*Math.round*/(matriz[i][j]) + '</font></td>';
                } else {
                    row += '<td>' + /*Math.round*/(matriz[i][j]) + '</td>';
                }
            }
            row += '</tr>';

            $('#wait_result').find('tbody').append(row);
        }


    });
    
    
    function comutarLinha(matriz, linhaUp, linhaDown) {
        
        var mAux = matriz[linhaUp];
        matriz[linhaUp] = matriz[linhaDown];
        matriz[linhaDown] = mAux;
        
        return matriz;
    }

/*
	
    public double somatoria(int i){
        double somatoria = 0;
        for(int j = i + 1; j != n; j++){
                somatoria += (matrix[i][j])*sltn[j];
        }
        return somatoria;
    }
	
*/ 



    function doMatriz(ordem) {
        rows = ordem;
        cols = ordem + 1;

        $('#wait_matriz').find('tbody').html('');
        for(var i = 0; i < ordem; i++) {
            var row = '<tr>';
            var j = 0;
            for(; j < ordem; j++) {
                row += '<td style="background: #ccc">' +
                    '<input type="number" class="form-control" id="field_' + i + '_' + j + '">' +
                    '</td>';
            }
            row += '<td style="background: #000000">' +
                '<input type="number" class="form-control" placeholder="=" id="field_' + i + '_' + j + '">' +
                '</td></tr>';

            $('#wait_matriz').find('tbody').append(row);
        }
    }

});
