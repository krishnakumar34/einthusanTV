const { addonBuilder } = require("stremio-addon-sdk");

var slugify = require('slugify');
const sources =  require("./sources");
// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/manifest.md
const manifest = require("./manifest");
const builder = new addonBuilder(manifest)



builder.defineStreamHandler((args) => {
	console.log("addon.js streams:", args);
  if(args.id.match(/einthusan_id:[^xyz]*/i)){
    return Promise.resolve(sources.stream(args.id))
	.then((streams) => ({  streams: [ streams ]}));
	//.then((streams) => { console.log('streams', args+streams)});
	}else {
	  console.log('stream reject');
	return Promise.resolve({ streams: [] });
  }
});

builder.defineCatalogHandler((args) => {
	console.log("addon.js Catalog:", args);
	console.log("catalog extra search:", args.extra.search);
	  if (args.extra.search) {
		  //return Promise(mycima(args.type, slug));
    return Promise.resolve(sources.search(args.id, args.extra.search))
        //.then((metas) => { console.log('metas', metas)});
        .then((metas) => ({ metas: metas}));
	}else {
    return Promise.resolve({ metas: [] });
  }
  
  
});

builder.defineMetaHandler((args) => {
	console.log("addon.js meta:", args);

	if(args.id.match(/einthusan_id:[^xyz]*/i)){
		//console.log('meta mycima');
    return Promise.resolve(sources.meta(args.id))
        //.then((metas) => { console.log('metas', metas)});
        .then((meta) => ({ meta: meta}));
	}else {
	  console.log('meta reject');
    return Promise.resolve({ meta: [] });
  }
  
  
});

module.exports = builder.getInterface()
