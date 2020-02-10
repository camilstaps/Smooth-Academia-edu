"use strict";

let keys=[
	'remove_readers_link',
	'remove_mentions_link',
	'remove_premium_link',

	'remove_premium_menu_item',
	'remove_search_alerts_menu_item',

	'disable_bulk_download_question',
	'remove_bulk_download_links',

	'remove_rating_modals'
];

document.addEventListener ('DOMContentLoaded',() => {
	browser.storage.sync.get().then (settings => {
		for (var key in settings)
			document.getElementById (key).checked=settings[key];
	});

	keys.forEach (key => {
		let checkbox=document.getElementById (key);
		checkbox.addEventListener ('change',function () {
			let settings={};
			settings[this.id]=this.checked;
			browser.storage.sync.set (settings);
		});
	});
});
