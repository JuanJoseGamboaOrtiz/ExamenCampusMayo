//ACA SE INYECTA EL CODIGO NECESARIO PARA EL FUNCIONAMIENTO DE MATERIALIZE


document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });

const el= document.querySelector('.tabs');
var instance = M.Tabs.init(el);