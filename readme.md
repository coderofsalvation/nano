NANO - Template Engine
=============================

[nano.js](https://github.com/trix/nano) with html-templates tag + recursion + transformers thrown into the mix:

   <template id="items">
     <div>
       <h2>{name}</h2>
       <hr>
       <template data-key="sub">
         <div>{type}</div>
         <div>{type:mytransformer}</div>
         <hr>
       </template>
     </div>
   </template>
   <div id="#items"></div>

   <script>
     new nanoplus($)

     $.renderTo( 
      '#items',                                                      // destination
      [{                                                             // data
        name:foo,                                                    // data
        sub:[{type:"bar"}]                                           // data
      }],                                                            // data
      'template#items',                                              // template 
      { mytransformer: function(value, data, key){ return "foo" } }  // transformers
     )
   </script>

## Usage 

It works exactly like nano except that it has extra wrapperfunctions:

* `$.renderTo( selector,data, template, transformers )`
* `$.render( template_selector,data )`
* `$.renderString(template, data)` (nano's original `render()`)

})

