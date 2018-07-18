package com.livestreaming.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.livestreaming.dto.TwitterLiveStreamingDto;
import com.livestreaming.service.LiveStreamingService;

@RestController
@RequestMapping("/stream")
@CrossOrigin
public class StreamDataController {
	
	@Autowired
	private LiveStreamingService liveStreamingService;
	
	@RequestMapping(value="/data" , method = RequestMethod.GET)
	public TwitterLiveStreamingDto getLiveStreamData() {
		System.out.println("in getLiveStreamData");
		return liveStreamingService.getLiveStreams();
	}
	
}
