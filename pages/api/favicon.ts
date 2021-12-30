import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: any, res: any) {
    if(!req.query || !req.query.url) return res.send("");

    const r = await axios.get(`https://encrypted-tbn2.gstatic.com/faviconV2?url=${(req.query.url as any).toString()}&client=VFE&size=64&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2`, { responseType: "arraybuffer" })

    res.send(r.data);
}