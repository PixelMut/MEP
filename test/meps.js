import test from 'ava'
import { scrapeEULegislators } from '../scraper'

test('legislators', async t => {
  const legislators = await scrapeEULegislators();

  t.true(Array.isArray(legislators));
  // t.is(legislators.length, 750)
  t.is(legislators.length, 748); // they are 748 now :/

  const first = legislators[0];
  console.log(first);
  t.is(first.name, 'Magdalena ADAMOWICZ');
  t.is(first.lastName, 'ADAMOWICZ');
  t.is(first.partyGroup, 'Group of the European People\'s Party (Christian Democrats)');
  t.is(first.country, 'Poland');
  t.is(first.url, 'http://www.europarl.europa.eu/meps/en/197490/MAGDALENA_ADAMOWICZ/home');
  t.is(first.image, 'http://www.europarl.europa.eu/mepphoto/197490.jpg');
})
