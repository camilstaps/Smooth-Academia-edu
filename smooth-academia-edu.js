"use strict";

let Browser=typeof browser=='undefined' ? chrome : browser;
let log=console.debug;

function remove_header_link (text)
{
	log ('Trying to remove '+text+' header link');

	let nav_links=document.querySelectorAll ('#main-header-container a');
	Array.from (nav_links).forEach (link => {
		if (link.innerText.toLowerCase()==text.toLowerCase()){
			if (link.parentNode.tagName=='LI')
				link.parentNode.parentNode.removeChild (link.parentNode);
			else
				link.parentNode.removeChild (link);
		}
	});
}

function remove_menu_item (text)
{
	log ('Trying to remove '+text+' user menu item');

	let menu_items=document.querySelectorAll ('#main-header-container a');
	Array.from (menu_items).forEach (item => {
		if (item.innerText.toLowerCase().indexOf (text.toLowerCase()) >= 0)
			item.parentNode.removeChild (item);
	});
}

function remove_ping (title)
{
	log ('Trying to remove '+title+' pings');

	let pings=document.querySelectorAll ('div.onsite-ping.visible');
	Array.from (pings).forEach (ping => {
		let title_span=ping.querySelector ('.title');
		if (title_span!=null && title_span.innerText.toLowerCase()==title.toLowerCase())
			ping.classList.remove ('visible');
	});
}

function remove_alt_ping (title)
{
	log ('Trying to remove '+title+' alternative pings');

	let pings=document.querySelectorAll ('.swp-alt-ping');
	Array.from (pings).forEach (ping => {
		let title_span=ping.querySelector ('h1');
		if (title_span!=null && title_span.innerText.toLowerCase()==title.toLowerCase())
			ping.parentNode.removeChild (ping);
	});
}

function remove_analytics_tab (title)
{
	log ('Trying to remove '+title+' analytics tab');

	let tabs=document.querySelectorAll ('.analytics-dashboard-container li');
	Array.from (tabs).forEach (tab => {
		if (tab.innerText.toLowerCase()==title.toLowerCase())
			tab.parentNode.removeChild (tab);
	});
}

function remove_bulk_download_links ()
{
	log ('removing bulk download buttons');

	var bulk_download_buttons=document.getElementsByClassName ('js-bulk-download-button');
	Array.from (bulk_download_buttons).forEach (btn => btn.parentNode.removeChild (btn));

	bulk_download_buttons=document.getElementsByClassName ('work-card--action-button-secondary');
	Array.from (bulk_download_buttons).forEach (btn => {
		let div=btn.querySelector ('div');
		if (div!=null && div.innerText=='Bulk Download')
			btn.parentNode.removeChild (btn);
	});
}

function disable_bulk_download_question ()
{
	log ('disabling bulk download questions');

	var download_buttons=document.getElementsByClassName ('js-work-download-button-container');
	Array.from (download_buttons).forEach (btn => {
		var attachmentId=btn.dataset.previewAttachmentId;
		if (attachmentId.indexOf ('Attachment_') != 0)
			return;
		attachmentId=attachmentId.slice (11);

		let link=btn.querySelector ('a');
		let link_clone=link.cloneNode (true); /* cloning removes the event listeners */
		link_clone.href='/attachments/'+attachmentId+'/download_file';
		btn.replaceChild (link_clone,link);
	});

	download_buttons=document.getElementsByClassName ('download-button--wrapper');
	Array.from (download_buttons).forEach (btn => {
		let link=btn.querySelector ('a').href.replace (/.*\.edu/,'').replace (/\?.*/,'');
		let real_button=btn.querySelector ('button');
		let real_button_clone=real_button.cloneNode (true);
		real_button_clone.addEventListener ('click',() => window.location=link);
		btn.replaceChild (real_button_clone,real_button);
	});

	var work_cards=document.getElementsByClassName ('work-card');
	Array.from (work_cards).forEach (card => {
		let i=card.querySelector ('i.fa-arrow-down');
		if (i==null)
			return;
		let link=i.parentNode.parentNode;
		let script=link.parentNode.querySelector ('script');
		if (script==null)
			return;
		let url=script.innerText.replace (/^[^]*academia\.edu(\/attachments\/\d+\/download_file)[^]*$/,'$1');
		let link_clone=link.cloneNode (true);
		link_clone.addEventListener ('click',() => window.location=url);
		link.parentNode.replaceChild (link_clone,link);
	});
}

function remove_article_download_link (string)
{
	log ('removing '+string+' buttons');

	var download_buttons=document.getElementsByClassName ('swp-tcr--cta-button');
	Array.from (download_buttons)
		.filter (btn => btn.innerText.indexOf (string) >= 0)
		.forEach (btn => btn.parentNode.removeChild (btn));
}

function remove_key_takeaways_links ()
{
	log ('removing key takeaways buttons');

	var key_takeaways_buttons=document.getElementsByClassName ('key-takeaways--button');
	Array.from (key_takeaways_buttons).forEach (btn => btn.parentNode.parentNode.parentNode.remove());

	var summary_buttons=document.getElementsByClassName ('swp-tcr--cta-button');
	Array.from (summary_buttons)
		.filter (btn => btn.childNodes.length >= 2 && btn.childNodes[1].innerText == 'Summary')
		.forEach (btn => btn.parentNode.removeChild (btn));
}

function disable_key_takeaways ()
{
	log ('removing 5-Minute Overview tabs')

	var tab=document.getElementById ('js--key-takeaways-tab');
	if (tab==null)
		return;

	tab.style.display='none';
}

function remove_rating_modals ()
{
	let rating_modals=document.getElementsByClassName ('work-rating--modal-inner');
	log ('removing '+rating_modals.length+' rating modal(s)');
	Array.from (rating_modals).forEach (mdl => {
		let ev=document.createEvent ('MouseEvents');
		ev.initMouseEvent ('click',true,true,window,1,0,0,0,0,false,false,false,false,0,null);
		mdl.querySelector ('.u-clickable').dispatchEvent (ev);
	});
}

function remove_discussion_modals ()
{
	let discussion_modals=
		Array.from (document.getElementsByClassName ('work-rating--modal-inner'));
	log ('removing '+discussion_modals.length+' discussion modal(s)');
	/*discussion_modals.forEach (mdl => {
		let ev=document.createEvent ('MouseEvents');
		ev.initMouseEvent ('click',true,true,window,1,0,0,0,0,false,false,false,false,0,null);
		mdl.querySelector ('.u-clickable').dispatchEvent (ev);
	});*/
}

function setup_at_document_end ()
{
	let callback=function (settings) {
		if (settings['remove_readers_link'])
			remove_header_link ('Readers');
		if (settings['remove_mentions_link'])
			remove_header_link ('Mentions');
		if (settings['remove_grants_link'])
			remove_header_link ('Grants');
		if (settings['remove_premium_link'])
			remove_header_link ('Premium');

		if (settings['remove_premium_menu_item'])
			remove_menu_item('Upgrade to Premium');
		if (settings['remove_search_alerts_menu_item'])
			remove_menu_item('Search Alerts');

		if (settings['remove_profile_visitors_analytics'])
			remove_analytics_tab ('Profile visitors');
		if (settings['remove_cv_analytics'])
			remove_analytics_tab ('CV');
	};
	if (typeof browser=='undefined')
		chrome.storage.sync.get (null,callback);
	else
		browser.storage.sync.get().then (callback);
}

function install_dom_change_handler ()
{
	let site=document.getElementById ('site');
	let config={
		attributes: false,
		childList: true,
		subtree: true
	};
	let observer=new MutationObserver (() => {
		observer.disconnect();
		setup_at_document_idle();
	});
	observer.observe (site,config);
}

function setup_at_document_idle ()
{
	let callback=function (settings) {
		if (settings['remove_grants_updates'])
			remove_ping ('Grants update');
		if (settings['remove_mentions_updates'])
			remove_ping ('Mentions update');
		if (settings['remove_readers_updates'])
			remove_ping ('Readers update');
		if (settings['remove_bulk_download_links'])
			remove_ping ('Bulk Download Books');

		if (settings['remove_bulk_download_links'])
			remove_bulk_download_links();
		if (settings['disable_bulk_download_question'])
			disable_bulk_download_question();
		if (settings['remove_full_pdf_package_links']){
			remove_article_download_link ('Full PDF Package');
			remove_alt_ping ('Download your PDF Package');
		}
		if (settings['remove_figures_links'])
			remove_article_download_link ('Download Figures');
		if (settings['remove_translate_links'])
			remove_article_download_link ('Translate PDF');

		if (settings['remove_key_takeaways_links'])
			remove_key_takeaways_links();
		if (settings['disable_key_takeaways'])
			disable_key_takeaways();

		if (settings['remove_rating_modals'])
			remove_rating_modals();
		if (settings['remove_discussion_modals'])
			remove_discussion_modals();

		install_dom_change_handler();
	};
	if (typeof browser=='undefined')
		chrome.storage.sync.get (null,callback);
	else
		browser.storage.sync.get().then (callback);
}

setup_at_document_end();
window.addEventListener ('load',setup_at_document_idle);
