const API = 'https://pokeapi.co/api/v2/pokemon/';

const $list  = document.querySelector('.search-field .drop-menu > ul');
const $field = document.querySelector('.search-field > input');

//added selector for 'Not found' text
const $nfText = document.querySelector('.search-field .drop-menu .nf');
//===================================

let list = [];

function listGenerator(list) {
    let template = '';
    for (let i = 0; i < list.length; i++) {
        template += '<li>' + list[i].name + '</li>';
    }
    $list.innerHTML = template;
}

fetch(API)
    .then(function (responce) {
        return responce.json()
    })
    .then(function (data) {
        list = data.results;
        listGenerator(list);
    });


$field.addEventListener('input', function() {
    let query = this.value.toLowerCase();
    let buffer = list;

    buffer = buffer.filter(function (element) {
        return element.name.toLowerCase().indexOf(query) + 1;
    });

    listGenerator(buffer);

//chenging the 'display' parameter for 'Not found' text
    if(buffer.length == 0)
    {
        $nfText.style.cssText = 'display: block';
    }
    else
    {
        $nfText.style.cssText = 'display: none';
    }
//=====================================================
});

$field.addEventListener('focus', function () {
    this.parentNode.classList.add('active');
});

$field.addEventListener('blur', function () {
    this.parentNode.classList.remove('active');
});

