// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { UserId, UserIdT } from '../farcaster/user-id';


export class FidsResponse {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):FidsResponse {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsFidsResponse(bb:flatbuffers.ByteBuffer, obj?:FidsResponse):FidsResponse {
  return (obj || new FidsResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsFidsResponse(bb:flatbuffers.ByteBuffer, obj?:FidsResponse):FidsResponse {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new FidsResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

fids(index: number, obj?:UserId):UserId|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? (obj || new UserId()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

fidsLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

static startFidsResponse(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addFids(builder:flatbuffers.Builder, fidsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, fidsOffset, 0);
}

static createFidsVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startFidsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static endFidsResponse(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createFidsResponse(builder:flatbuffers.Builder, fidsOffset:flatbuffers.Offset):flatbuffers.Offset {
  FidsResponse.startFidsResponse(builder);
  FidsResponse.addFids(builder, fidsOffset);
  return FidsResponse.endFidsResponse(builder);
}

unpack(): FidsResponseT {
  return new FidsResponseT(
    this.bb!.createObjList(this.fids.bind(this), this.fidsLength())
  );
}


unpackTo(_o: FidsResponseT): void {
  _o.fids = this.bb!.createObjList(this.fids.bind(this), this.fidsLength());
}
}

export class FidsResponseT {
constructor(
  public fids: (UserIdT)[] = []
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const fids = FidsResponse.createFidsVector(builder, builder.createObjectOffsetList(this.fids));

  return FidsResponse.createFidsResponse(builder,
    fids
  );
}
}
