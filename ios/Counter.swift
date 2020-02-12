//
//  Counter.swift
//  ChatApplication
//
//  Created by Admin on 10/02/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
@objc(Counter)
class Counter: RCTEventEmitter {
  private var count = 0
  
  @objc
  func increment() {
    count += 1
    print("count is \(count)")
    sendEvent(withName: "onIncrement", body: ["count": count])
  }
  // we need to override this method and
  // return an array of event names that we can listen to
  override func supportedEvents() -> [String]! {
    return ["onIncrement"]
  }

  @objc
  func getCount(_ callback: RCTResponseSenderBlock) {
    callback([count])
  }
  
  @objc
  func decrement(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    if (count == 0) {
      let error = NSError(domain: "", code: 200, userInfo: nil)
      reject("E_COUNT", "count cannot be negative", error)
    } else {
      count -= 1
      resolve("count was decremented")
    }
  }
  @objc
  func incr(
  _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    if (count < 0) {
      let error = NSError(domain: "", code: 200, userInfo: nil)
      reject("E_COUNT", "count cannot be negative", error)
    } else {
      count += 1
      resolve("count was incremented")
    }
  }
    
  
}


