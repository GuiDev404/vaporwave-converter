const LETRAS_VAPORWAVE = ` ａ , ｂ , ｃ , ｄ , ｅ , ｆ , ｇ , ｈ , ｉ , ｊ , ｋ , ｌ , ｍ , ｎ , ｏ , ｐ , ｑ , ｒ , ｓ, ｔ , ｕ , ｖ , ｗ , ｘ , ｙ , ｚ `.split(',');
const PARES_DE_CARACTERES = [ ['【','】'],['〖','〗'],['〘 ',' 〙'],['░▒▓','▓▒░'],['《','》'] ];
const SOLO_UN_CARACTERES_ADELANTE = ['░', '▒' ,'▓' ,'█','【','〖','💊','💾'];
const SOLO_UN_CARACTERES_ATRAS = ['░', '▒' ,'▓' ,'█','】','〗','💊','💾','》》'];
const LETRAS_JAPONESAS = `ｦ,ｧ,ｨ,ｩ,ｪ,ｫ,ｬ,ｭ,ｯ,ｰｱ,ｲ,ｳ,ｴ,ｵ,ｶ,ｷ,ｸ,ｹ,ｻ,ｼ,ｽ,ｾ,ｿ,ﾀ,ﾁ,ﾂ,ﾃ,ﾄ,ﾅ,ﾇ,ﾈ,ﾊ,ﾋ,ﾌ,ﾍ,ﾎ,ﾏ,ﾑ,ﾒ,ﾓ,ﾔ,ﾕ,ﾗ,ﾘ,ﾙ,ﾚ, ばいばい!,フェリズ ,ネコ,カワイ,悲しい,必要,愛,頑張る,人,友達,寂しい,あれ,灰色の,禁止`.split(',');

//FUNCTIONS HELPERS

const caracterAlFinal = ()=> [...LETRAS_JAPONESAS,...SOLO_UN_CARACTERES_ATRAS].sort(()=> Math.random() - 0.5);

const numeroRandom = (array)=> Math.floor(Math.random() * ((array.length) - 0)) + 0;

const seleccionarElementoRandom = (arregloDeStrings) => {
    let numero = numeroRandom(arregloDeStrings);
    return arregloDeStrings[numero];
}; 

const obtenerLetrasAbc = (abecedario) => {
    for(let i = 97 ;i <= 122;i++){
        abecedario.push(String.fromCharCode(i));
    }

    return abecedario;
} 

const obtenerInputValue = ()=> document.getElementById('input').value.toLowerCase();

//FUNCTIONS CONVERSOR

const buscarIndices = ()=>{
    let value_user = obtenerInputValue().trim().split('');

    if(value_user.length === 0){
        return false;
    }

    const LETRAS_ABC = obtenerLetrasAbc([]);

    let filtrar_indices = value_user.reduce((acc,currentValue)=>{
            acc.push(LETRAS_ABC.indexOf(currentValue))
            return acc;
    },[])

    clearAll();
    return conversion(filtrar_indices);
}

const conversion = (indices)=>{
    let vaporwave_font = indices.reduce((acc,currentValue)=> acc.concat( LETRAS_VAPORWAVE[currentValue]) ,'');
    vaporwave_font = vaporwave_font.split('undefined').join('  '); //arreglando los espacios con undefined

    return agregarCaracteres(vaporwave_font);
}

const agregarCaracteres = (palabra_vaporwave)=>{
    let caracteres_pares = seleccionarElementoRandom(PARES_DE_CARACTERES);

    let todas_las_variantes = [];

    if(typeof caracteres_pares === 'object' &&  caracteres_pares.length > 0){
        let [ start,end ] = caracteres_pares;
        
        let agregar = (start+=palabra_vaporwave);
        agregar = (start += end);
        
        todas_las_variantes.push(agregar);
    }

    let caracter_adelante = seleccionarElementoRandom(SOLO_UN_CARACTERES_ADELANTE);
    caracter_adelante += palabra_vaporwave;

    //------------------------------------------------------------------

    let caracter_atras = seleccionarElementoRandom(caracterAlFinal());
    caracter_atras = (palabra_vaporwave += caracter_atras);

    todas_las_variantes.push(...[caracter_atras,caracter_adelante])

    return UI(todas_las_variantes);
}   

const UI = (variantes)=>{
    const OUTPUT_VALUE = document.getElementById('output');

    let palabra_final = seleccionarElementoRandom(variantes);

    OUTPUT_VALUE.innerHTML = palabra_final;
}

const clearAll = ()=>{
    let input = document.getElementById('input');
    let output = document.getElementById('output');

    setInterval(() => {
        if(input.value.length === 0){
            output.innerHTML = '';
        }    
    }, 1000);
}

let btn_copy = document.getElementById('copy_btn');

btn_copy.addEventListener('click', () =>{
    let salida = document.getElementById('output');
    salida.focus();
    document.execCommand('selectAll');
    document.execCommand('copy');
})

document.addEventListener('input', buscarIndices)