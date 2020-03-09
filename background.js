"use strict";

let Browser=typeof browser=='undefined' ? chrome : browser;

Browser.runtime.onInstalled.addListener (details => {
	if (details.reason=='install'){
		Browser.storage.sync.set ({
			remove_readers_link: true,
			remove_mentions_link: true,
			remove_grants_link: true,
			remove_premium_link: true,

			remove_premium_menu_item: true,
			remove_search_alerts_menu_item: true,

			remove_grants_updates: true,
			remove_mentions_updates: true,
			remove_readers_updates: true,

			remove_profile_visitors_analytics: true,
			remove_cv_analytics: true,

			disable_bulk_download_question: true,
			remove_bulk_download_links: true,

			disable_key_takeaways: true,
			remove_key_takeaways_links: true,

			remove_rating_modals: true
		});
	}
});
