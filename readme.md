NANO - Template Engine
=============================

[nano.js](https://github.com/trix/nano) with html-templates tag + recursion + transformers thrown into the mix:

html:

    <template id="items">
      <div>
        <h2>{name}</h2>
        <hr>
        <template data-key="sub">
          <div>{type}</div>
          <div>{category.name}</div>
          <div>{type:mytransformer}</div>
          <hr>
        </template>
      </div>
    </template>
    <div id="#items"></div>

js:

    <script>
      new nanoplus($)

      $.renderTo( 
       '#items',                                                      // destination
       [{                                                             // data
         name:foo,                                                    // data
         category: {name:"foo"},                                      // data
         sub:[{type:"bar"}]                                           // data
       }],                                                            // data
       'template#items',                                              // template 
       { mytransformer: function(value, data, key){ return "foo" } }  // transformers
      )
    </script>

## Usage 

It works exactly like nano except that it has extra wrapperfunctions:

* `$.renderTo( selector,data, template, transformers )`
* `$.render( template_selector,data )` returns string
* `$.renderString(template_str, data)` (nano's original `render()`) 
* `$.transformer` associative array with global transformer functions

global transformer example:

  $.transformer.price = function(value,data,key){
    return value + ' ' + data.currency
  }
