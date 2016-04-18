const resultTemplate = `
<br>
<h4>Resultado CSV</h4>
<table class="stripped responsive-table bordered" id="result">
    <% _.each(rows, (row) => { %>
        <tr class="<%=row.type%>">
            <% _.each(row.items, (name) =>{ %>
                <td><%= name %></td>
            <% }); %>
        </tr>
    <% }); %>
</table>
`;

/* Volcar la tabla con el resultado en el HTML */
const fillTable = (rows) => {
    'use strict';
    var template = _.template(resultTemplate)({rows: rows});
    $('#finaltable').html(template);
};
/* Volcar en la textarea de entrada
 * #original el contenido del fichero fileName */
const dump = (fileName) => {
  'use strict';
  console.log("filename=.."+fileName);
  console.log("entre adump..");
  $.get("js/input.txt",function(data){
      console.log("data="+data);
        $("#original").val(data);
  },'text');
  /*
  $.get(fileName, function (data) {
      console.log("entre a $get...");
      $("#original").val(data);
  });*/
};
const main = () => {
    'use strict';
    var original = $('#original').val();
    if (original === '') {
        alert('El texto está vacío. Introduzca algo.');
    } else {
        if (window.localStorage) {
            localStorage.original = original;
        }
        $.get('/csv',
            {input: $('#original').val()},
            fillTable,
            'json'
        );
    }
    return false;
};

$(document).ready(() => {
    'use strict';
    // If the browser supports localStorage and we have some stored data
    if (window.localStorage && localStorage.original) {
        $('#original').val(localStorage.original);
    }

    $('#form').submit(main);
    $('.button-collapse').sideNav();
});
/* botones para rellenar el textarea */
   $('button.ejemplos').each( (_,y) => {
     'use strict';
     console.log("entre222...");
     $(y).click( () => { dump(`input_examples/${$(y).text()}.txt`); });
   });
