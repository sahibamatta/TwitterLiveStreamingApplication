package com.livestreaming.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.livestreaming.dto.FrequentlyUsedTermsDto;
import com.livestreaming.dto.LiveTweetsDto;
import com.livestreaming.dto.LocationCountDto;
import com.livestreaming.dto.TwitterLiveStreamingDto;
import com.livestreaming.properties.OAuthProperties;

import twitter4j.Paging;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

@Service
public class LiveStreamingService {

	@Autowired
	private OAuthProperties oAuthProperties;

	private static final int SUCCESS_STATUS =1 ;
	private static final int FAILUE_STATUS =0 ;
	private static final String SUCCESS_MESSAGE ="Real time tweets fetched successfully" ;
	private static final String FAILURE_MESSAGE ="Error in fetching real time tweets due to : " ;

	public TwitterLiveStreamingDto getLiveStreams() {
		System.out.println("in getLiveStreams");

		try {
			TwitterLiveStreamingDto twitterLiveStreamingDto=  null;
			Twitter twitter = getTwitterInstance(twitterLiveStreamingDto);

			HashMap<String,Integer> locationCount = new HashMap<>();
			List<Status> status = getStatusByPagination(twitter);

			System.out.println("status	::"+status.size());

			List<LiveTweetsDto> liveTweetsDtoList =getLiveTweetsDtoList(status, locationCount);

			List<FrequentlyUsedTermsDto> frequentlyUsedTermsDtoList=getTop20Terms(sortHashMapByValues(getTermFrequency(liveTweetsDtoList)));


			if(liveTweetsDtoList.isEmpty()) {
				return new TwitterLiveStreamingDto(FAILUE_STATUS, FAILURE_MESSAGE+"no live tweets found", null, null,null);
			}

			HashMap<String,Integer> finalLocationCount=getFinalLocationCount(locationCount);

			if(finalLocationCount.isEmpty()) {
				return new TwitterLiveStreamingDto(FAILUE_STATUS, FAILURE_MESSAGE+"no geo location found", null, null,null);
			}

			List <LocationCountDto> locationCountDtoList = new ArrayList<>();
			TreeMap<String, Integer> treeMap = new TreeMap<String, Integer>();
			treeMap.putAll(finalLocationCount);
			for(String loc : treeMap.keySet()) {
				System.out.println("finalloccount::country::"+loc+"::count::"+treeMap.get(loc));
				LocationCountDto locationCountDto = new LocationCountDto(loc, treeMap.get(loc));
				locationCountDtoList.add(locationCountDto);
			}

			return new TwitterLiveStreamingDto(SUCCESS_STATUS, SUCCESS_MESSAGE, liveTweetsDtoList, locationCountDtoList,frequentlyUsedTermsDtoList);
		}
		catch (TwitterException e) {
			System.out.println("twitter exception is::"+e);
			return new TwitterLiveStreamingDto(FAILUE_STATUS, FAILURE_MESSAGE+e, null, null,null);
		}
		catch(Exception e) {
			System.out.println("getLiveStreams exception is::"+e);
			return new TwitterLiveStreamingDto(FAILUE_STATUS, FAILURE_MESSAGE+e, null, null,null);
		}
	}

	private List<Status> getStatusByPagination(Twitter twitter) throws TwitterException {
		System.out.println("getStatusByPagination start");
		Paging paging = new Paging();
		paging.setCount(1000);
		List<Status> status = twitter.getHomeTimeline(paging);
		System.out.println("getStatusByPagination end");
		return status;
	}

	private List<LiveTweetsDto> getLiveTweetsDtoList(List<Status> status,HashMap<String, Integer> locationCount) {

		System.out.println("getLiveTweetsDtoList start");
		List<LiveTweetsDto> liveTweetsDtoList=new ArrayList<>();

		for(Status s : status) {
			String finalLocation = getFinalLocation(s);
			String id =s.getId()+"";
			String tweets = s.getText();
			String location = s.getUser().getLocation();
			System.out.println("date::"+s.getUser().getCreatedAt()+"::tweets::"+tweets+"::location::"+finalLocation+
					"userID::"+id);

			setLocationCountList(locationCount, finalLocation);

			LiveTweetsDto liveTweets = new LiveTweetsDto(id, location, tweets);
			liveTweetsDtoList.add(liveTweets);
		}
		System.out.println("getLiveTweetsDtoList end");

		return liveTweetsDtoList;
	}

	private void setLocationCountList(HashMap<String, Integer> locationCount, String finalLocation) {
		if(locationCount.containsKey(finalLocation)){
			int count=locationCount.get(finalLocation)+1;
			locationCount.put(finalLocation, count);
		}
		else {				
			locationCount.put(finalLocation, 1);
		}
	}

	private Twitter getTwitterInstance(TwitterLiveStreamingDto twitterLiveStreamingDto) {
		System.out.println("in getTwitterInstance::");

		System.setProperty("java.net.useSystemProxies", "true");
		ConfigurationBuilder configuration = new ConfigurationBuilder();

		configuration.setDebugEnabled(true).setOAuthConsumerKey(oAuthProperties.getConsumerKey())
		.setOAuthConsumerSecret(oAuthProperties.getConsumerSecret()).setOAuthAccessToken(oAuthProperties.getAccessToken())
		.setOAuthAccessTokenSecret(oAuthProperties.getAccessSecret());

		TwitterFactory twitterFactory = new TwitterFactory(configuration.build());

		return twitterFactory.getInstance();
	}

	private HashMap<String,Integer> getFinalLocationCount(HashMap<String, Integer> locationCount) {

		HashMap<String,Integer> newHashMap = new HashMap<>();
		Iterator<String> iterator = locationCount.keySet().iterator();
		while(iterator.hasNext())
		{ 
			String countryOrCity = iterator.next();
			System.out.println("countryOrCity b4 getcountrynameforcityname is::"+countryOrCity+"::count is::"+locationCount.get(countryOrCity));
			String countryName =countryOrCity.equals("")?"Others":getCountryNameFromCityName(countryOrCity.trim());
			System.out.println("countryname is::"+countryName);
			int count=0;
			if(locationCount.containsKey(countryName)){

				if(!countryName.equals(countryOrCity)) {
					count=locationCount.get(countryOrCity)+locationCount.get(countryName);
					locationCount.put(countryName,count);
					iterator.remove();
				}
			}
			else {
				if(newHashMap.containsKey(countryName))
					count=locationCount.get(countryOrCity)+newHashMap.get(countryName);
				else
					count=locationCount.get(countryOrCity);

				newHashMap.put(countryName, count);
				iterator.remove();
			}
		}
		locationCount.putAll(newHashMap);

		return locationCount;
	}

	private String getFinalLocation(Status s) {
		String location=s.getUser().getLocation();
		String finalLocationAfterComma = location.contains(",")?location.substring(location.indexOf(",")+1,location.length()):location;
		String finalLocationAfterAnd = finalLocationAfterComma.contains("&")?finalLocationAfterComma.substring(0,finalLocationAfterComma.indexOf("&") -1):finalLocationAfterComma;
		return finalLocationAfterAnd.contains("City")?finalLocationAfterAnd.substring(0,finalLocationAfterAnd.indexOf("City") -1):finalLocationAfterAnd;

	}

	/*private String tryWithMultipleKeys(String city) {
		System.out.println("in try with multiple keys::");
		String country="";
		String keys [] = {"11dd1d5b8a60de91d033630f7c26c089","5b43f3052f72414e25dd46570da32f1d","7dbc6f2ab0d8b605de33572ac8f813a2"};
		for(int i=0;i<keys.length;i++) {
			country=getCountryNameFromCityName(city,keys[i]);
			System.out.println("country in tryWithMultipleKeys::"+country);
			if(!country.equals("Exception"))
				break;
		}
		return country;
	}
	 *//*
	private String getCountryNameFromCityName(String city,String key) {

		try {
		RestTemplate restTemplate = new RestTemplate(); 
		ResponseEntity<CityCountryDto[]> responseEntity = restTemplate.getForEntity("https://battuta.medunes.net/api/country/search/?country="+city+"&key="+key, CityCountryDto[].class);
		CityCountryDto[] cityCountry = responseEntity.getBody();
		System.out.println("country url ::"+cityCountry+"citycountry len--"+cityCountry.length);
		if(cityCountry.length!=0)
			return city;
		else {
			responseEntity = null;
			cityCountry=null;
			responseEntity = restTemplate.getForEntity("https://battuta.medunes.net/api/country/search/?city="+city+"&key="+key, CityCountryDto[].class);
			cityCountry = responseEntity.getBody();
			System.out.println("city url ::"+cityCountry+"citycountry len--"+cityCountry.length);

			if(cityCountry.length!=0)
				return cityCountry[0].getName();
			else
				return "Others";
		}
		}
		catch(Exception e) {
			System.out.println("getCountryNameFromCityName exception::"+e);
			return "Exception";

		}
	}*/

	private String getCountryNameFromCityName(String city) {

		if(city.equalsIgnoreCase("Beijing") || city.contains("China"))
			return "China";

		if(city.equalsIgnoreCase("New York") || city.equalsIgnoreCase("New Mexico") ||
				city.equalsIgnoreCase("Albuquerque") || city.contains("America")
				|| city.contains("Mexico"))
			return "United States of America";

		if(city.equalsIgnoreCase("New Delhi") || city.equalsIgnoreCase("Delhi") ||city.contains("India") )
			return "India";

		if(city.equalsIgnoreCase("Ankara") || city.contains("Turkey"))
			return "Turkey";

		if(city.equalsIgnoreCase("Nairobi") || city.contains("Kenya"))
			return "Kenya";

		if(city.equalsIgnoreCase("Tokya") || city.contains("Japan"))
			return "Japan";

		if(city.equalsIgnoreCase("Jakarta") || city.contains("Indonesia"))
			return "Indonesia";

		if(city.equalsIgnoreCase("") || city.contains("est 2017.11.04"))
			return "Others";
		else 
			return city;
	}

	private HashMap<String,Integer> getTermFrequency(List <LiveTweetsDto> liveTweetsDtoList){
		System.out.println("in getTermFrequency");
		HashMap<String,Integer> termFrequeny = new HashMap<>();
		for(LiveTweetsDto liveTweetsDto :liveTweetsDtoList) {
			String[] words =liveTweetsDto.getTweets().split(" ");
			for(String word: words) {
				if(word.contains("#") || word.contains("@")) {
					if(termFrequeny.containsKey(word)) {
						termFrequeny.put(word, termFrequeny.get(word)+1);
					}
					else
						termFrequeny.put(word,1);
				}
			}
			for(String term : termFrequeny.keySet())
				System.out.println("termfreq is term::"+term+"::frequency::"+termFrequeny.get(term));
		}

		return termFrequeny;
	}

	private HashMap<String,Integer> sortHashMapByValues(HashMap<String,Integer> termFrequeny) {
		System.out.println("in sortHashMapByValues");
		List<String> mapKeys = new ArrayList<>(termFrequeny.keySet());
		List<Integer> mapValues = new ArrayList<>(termFrequeny.values());
		Collections.sort(mapValues);
		Collections.sort(mapKeys);

		LinkedHashMap<String, Integer> sortedMap =
				new LinkedHashMap<>();

		Iterator<Integer> valueIt = mapValues.iterator();
		while (valueIt.hasNext()) {
			Integer val = valueIt.next();
			Iterator<String> keyIt = mapKeys.iterator();

			while (keyIt.hasNext()) {
				String key = keyIt.next();
				Integer comp1 = termFrequeny.get(key);
				Integer comp2 = val;

				if (comp1==comp2) {
					keyIt.remove();
					sortedMap.put(key, val);
					break;
				}
			}
		}

		for(String map : sortedMap.keySet()) {
			System.out.println("sorted map :: key ::"+map +"::value::"+sortedMap.get(map));
		}

		return sortedMap;
	}

	private List<FrequentlyUsedTermsDto> getTop20Terms(HashMap<String,Integer> sortedMap) {
		System.out.println("in getTop20Terms");
		List<FrequentlyUsedTermsDto> frequentlyUsedTermsDtoList = new ArrayList<>();
		System.out.println("in gettop20terms");
		for(int i = sortedMap.size()-1;i>=sortedMap.size()-21;i--) {
			sortedMap.keySet().removeAll(Arrays.asList(sortedMap.keySet().toArray()).subList(0, sortedMap.size()-20));
		}

		for(String key : sortedMap.keySet()) {
			frequentlyUsedTermsDtoList.add(new FrequentlyUsedTermsDto(key, sortedMap.get(key)));	
		}

		System.out.println("getTop20Terms end");
		return frequentlyUsedTermsDtoList;
	}
}

