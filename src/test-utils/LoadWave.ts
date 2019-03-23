/*
 * Copyright (c) 2018-Present, Spotify AB.
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as WavDecoder from 'wav-decoder';
import { XAudioBuffer } from '../XAudioBuffer';
import { readFile } from '../pio';

export async function loadWave(filePath: string): Promise<XAudioBuffer> {
  const fileData = await readFile(filePath);
  const decoded = await WavDecoder.decode(fileData);

  const audio = new XAudioBuffer({
    sampleRate: decoded.sampleRate,
    numberOfChannels: decoded.channelData.length,
    length: decoded.channelData[0].length
  });

  for (let i = 0; i < decoded.channelData.length; i++) {
    const chan = decoded.channelData[i];
    audio.copyToChannel(chan, i, 0);
  }

  return audio;
}
