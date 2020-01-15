export const scrapeEULegislators = async () => {
    const cheerio = require('cheerio');
    const axios = require('axios');


    const url = 'http://www.europarl.europa.eu/meps/en/full-list/all';

    return axios.get(url)
        .then(response => {
            const baseUrl = 'http://www.europarl.europa.eu';
            const html = response.data;
            const $ = cheerio.load(html); // add the source HTML to the local cheerio object

            let EP_list = []; // list of elt
            let regExp = /\(([^)]+)\)/; // to catch only the value between parenthesis
            $('li.ep_item.europarl-expandable-item').each(function(i, elem) {
                EP_list[i] = {
                    name: $(this).find('span.member-name').text().trim(),
                    lastName: $(this).find('span.member-name').text().trim().split(' ')[1],
                    partyGroup : $(this).find('div.ep-layout_group').text().trim(),
                    country : $(this).find('div.ep-layout_country').text().trim(),
                    url : baseUrl + $(this).find('a.ep_content').attr('href')+'/'+$(this).find('a.ep_content').attr('title').toUpperCase().replace(' ', '_')+'/home',
                    image : baseUrl +regExp.exec($(this).find('span.ep_small').attr('style'))[1]
                }
            });

            return EP_list; // list of all MEP
        })
        .catch(error => {
            console.log(error);
            return [];
        });
};
