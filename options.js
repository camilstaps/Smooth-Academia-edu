"use strict";

let Browser=typeof browser=='undefined' ? chrome : browser;

let keys=[
	'remove_readers_link',
	'remove_mentions_link',
	'remove_grants_link',
	'remove_premium_link',

	'remove_premium_menu_item',
	'remove_search_alerts_menu_item',

	'remove_grants_updates',
	'remove_mentions_updates',
	'remove_readers_updates',

	'remove_profile_visitors_analytics',
	'remove_cv_analytics',

	'disable_bulk_download_question',
	'remove_bulk_download_links',

	'disable_key_takeaways',
	'remove_key_takeaways_links',

	'remove_rating_modals'
];

document.addEventListener ('DOMContentLoaded',() => {
	let callback=function (settings) {
		for (var key in settings)
			document.getElementById (key).checked=settings[key];
	};
	if (typeof browser=='undefined')
		chrome.storage.sync.get (null,callback);
	else
		browser.storage.sync.get().then (callback);

	keys.forEach (key => {
		let checkbox=document.getElementById (key);
		checkbox.addEventListener ('change',function () {
			let settings={};
			settings[this.id]=this.checked;
			Browser.storage.sync.set (settings);
		});
	});
});
