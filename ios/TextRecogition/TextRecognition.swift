//
//  TextRecognition.swift
//  ChatApplication
//
//  Created by Admin on 17/02/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import Firebase

@objc(TextRecognition)
class TextRecognition: NSObject {
  
  let vision = Vision.vision()
  
  @objc func getSourceImage(_ trackinfo: NSDictionary,callback: @escaping RCTResponseSenderBlock) -> Void{
    guard let infoDictionary = trackinfo as? [String: Any] else {
      return
    }
    
    load(fileName: infoDictionary["imageSource"] as! String,completion:{ result in
      
      let image = VisionImage(image: result)
      
      let textRecognizer = self.vision.onDeviceTextRecognizer()
      textRecognizer.process(image) { result, error in
        guard error == nil, let myText = result else {
          // ...
          return
        }
        
        // Recognized text
        
        let resultText = myText.text
        
        if let countryCode = (Locale.current as NSLocale).object(forKey: .countryCode) as? String {    print(countryCode)}
        let seconds = 0.1;
        DispatchQueue.main.asyncAfter(deadline: .now() + seconds) {
          callback([resultText])
        }
      }
    })
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func load(fileName: String, completion: @escaping (UIImage)->()) {
    DispatchQueue.global(qos: .background).async {
      do {
        let data = try Data.init(contentsOf: URL.init(string:fileName)!)
        DispatchQueue.main.async {
          completion(UIImage(data: data)!)
        }
      }
      catch {
        print("Not able to load image")
      }
    }
  }
  
  @objc
  func translate(_ trackinfo: NSDictionary,callback: @escaping RCTResponseSenderBlock) -> Void{
    guard let infoDictionary = trackinfo as? [String: Any] else {
      return
    }
    
    let options = TranslatorOptions(sourceLanguage: .en, targetLanguage:TranslateLanguage(rawValue: infoDictionary["language"] as! UInt)!)
    let englishTranslator = NaturalLanguage.naturalLanguage().translator(options: options)
    
    downloadLanguage(translator: englishTranslator, completion:{
      englishTranslator.translate(infoDictionary["imageSource"] as! String) { translatedText, error in
        guard error == nil, let translatedText = translatedText else { return }
        // Translation succeeded.
        print("translated text ", translatedText)
        callback([translatedText])
      }
    })
  }
  
  @objc
  func downloadLanguage(translator: Translator, completion: @escaping ()->()) {
    DispatchQueue.global(qos: .background).async {
      do {
//                let data = try Data.init(contentsOf: URL.init(string:fileName)!)
        let conditions = ModelDownloadConditions(
          allowsCellularAccess: false,
          allowsBackgroundDownloading: true
        )
        DispatchQueue.main.async {
          //          completion(UIImage(data: data)!)
          translator.downloadModelIfNeeded(with: conditions) { error in
             guard error == nil else { return }
          completion()
        }
      }
        
      }
    }
    
  }
}

