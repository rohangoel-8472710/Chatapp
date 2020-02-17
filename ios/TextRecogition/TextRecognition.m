//
//  TextRecognition.m
//  ChatApplication
//
//  Created by Admin on 17/02/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(TextRecognition, NSObject)

RCT_EXTERN_METHOD(getSourceImage:(NSDictionary*)trackinfo callback:(RCTResponseSenderBlock))

RCT_EXTERN_METHOD(translate:(NSDictionary*)trackinfo callback:(RCTResponseSenderBlock))

@end
