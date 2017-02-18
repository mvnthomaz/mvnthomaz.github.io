/**
 * Created by thomaz on 18/02/17.
 */

$(function(){

    $('#bt_calcular').on('click', function(){

        /*
         Codigo em Java

         double statePaper = 1;
         double area = 1;

         int i = 0;
         while( area > 0.0001 ) {
             statePaper /= 2;
             area = Math.pow(statePaper, 2);

             System.out.println(area);

             i++;
         }

         System.out.println(i);
        */

        var statePaper = 1;
        var area = 1;

        var i = 1;

        var table = $('#wait_result');
        table.find('tbody').html('');
        while( area > 0.000001 ) {
            statePaper /= 2;
            area = Math.pow(statePaper, 2);

            var row = '';
            if( area < 0.000001 ) {
                row = '<tr style="background: #b40000; color: #fff">';
            } else {
                row = '<tr>';
            }
            row += '<td>' + (i++) + '</td>';
            row += '<td>' + area + '</td>';
            row += '</tr>';

            table.find('tbody').append(row);
        }

        table.find('tbody')

    });

});