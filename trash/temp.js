!function(){var s={},root="u"!=(typeof window)[0]&&window||GLOBAL,w=0;function G(i){if(s[i])return s[i];throw"Not found: "+i}function I(i){var m=G(i);if(!m._d&&m.g){m._a=1;m.g().forEach(function(other){if("@"!=other[0]){if(G(other)._a)throw"Cycle: "+i+", "+a;if(!G(other)._d)I(other)}})}if(m.v)m.v();if(m.i)m.i();m._d=1;delete m._a}root.__m=function(i,m){if(m){s[i]=m()}else if(typeof i=="string"){if(!w)throw"Not initialized yet!";return s[i].e}else if(!w){for(i in s)if(G(i).g)G(i).s(G(i).g().map(function(i){return G("@"==i[0]?i.slice(1):i).e||{}}));for(i in s)I(i);w=true}}}();
function forceInit(){__m()}function getModule(name){return __m(name)}
__m ("Test", function (){
function hi (){
console.log ("hi");
}
return {"e":{"hi":hi}};
});
forceInit ();
getModule ("Test").hi ();
__m();