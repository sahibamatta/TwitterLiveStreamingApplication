package com.livestreaming.dto;

import java.util.HashMap;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TwitterLiveStreamingDto {

	int status;
	String message;
	List <LiveTweetsDto> liveTweets;
	List <LocationCountDto> locationCount;
	List <FrequentlyUsedTermsDto> frequentlyUsedTerms;

}
