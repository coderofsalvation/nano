var nanoplus = function($){
  
  var pick = function(x, xs){
    return String(x).split('.').reduce(function(acc, x) {
      if (acc == null) return;
      return acc[x];
    }, xs);
  }

  var renderStringTemplateTag = function(template,data){ 
    var tmp = document.createElement('div')
    tmp.innerHTML = template
    $(tmp).find('template').each( function(i,el){
      if( ! $(el).attr('data-key') ) return
      $(el).after( $.render( el.innerHTML, pick( $(el).attr('data-key'), data ) ) )
    })
    return tmp.innerHTML
  }
  
  $.transformer = {}

  $.renderString = function(template, data ) {
    if( !data ) return
    var result = String(template).replace(/\{([\w\.:]*)\}/g, function(str, key) {
      var transformer = key.replace(/.*:/,'')
      var variable = key.replace(/:.*/,'') 
      var keys = variable.split("."), v = data[keys.shift()];
      for (var i = 0, l = keys.length; i < l; i++){
        v = v && keys && keys[i] ? v[keys[i]] : undefined
        if( typeof v == "function" ) v = v(data)
      }
      if( v && $.transformer[transformer] ) v = $.transformer[transformer](v,data,variable)
      return (typeof v !== "undefined" && v !== null) ? v : "{"+key+"}";
    });
    // render subtemplates
    result = template.match(/<template/) != null ? renderStringTemplateTag(result, data) : result 
    return result.replace(/\{([\w\.:]*)\}/g, '')
  }

  $.renderTo = function( selector,data, template, transformer ){
    if( !data ) return
    if( transformer ) for( var i in transformer ) $.transformer[i] = transformer[i]
    $(selector).each( function(i,el){
      var e = $(el)
      if( !e ) return
      e.html( $.render( template ? template : selector,data ) )
    })
  }

  $.render = function( template, data ){
    template = template.match(/</) != null ? {innerHTML:template} : document.querySelector(template)
    if( !data || !template.innerHTML ) return
    if( data.length != undefined ){ // is array 
      var html = ''
      for( var i in data ) html += $.renderString( template.innerHTML, data[i] )
      return html
    }else return $.renderString( template.innerHTML,data )
  }

}

