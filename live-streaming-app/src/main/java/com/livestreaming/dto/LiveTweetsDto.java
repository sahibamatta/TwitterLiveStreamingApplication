package com.livestreaming.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LiveTweetsDto {

	String id;
	String location;
	String tweets;
}
