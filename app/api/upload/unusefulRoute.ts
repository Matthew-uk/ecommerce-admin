import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const form = new formidable.IncomingForm();

    const { fields, files }: any = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject({ err });
        } else {
          resolve({ fields, files });
        }
      });
    });

    console.log("Length:", files?.length);
    console.log("Fields:", fields);

    return NextResponse.json({ message: "ok" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred!!!", error },
      { status: 404 }
    );
  }
};

export const config = {
  api: { bodyParser: false },
};

export { handle as POST };

// import multiparty from "multiparty";
// import { NextApiRequest, NextApiResponse } from "next";
// import { NextRequest, NextResponse } from "next/server";

// export const handle = async (req: NextApiRequest, res: NextResponse) => {
//   try {
//     const form = new multiparty.Form();

//     const { fields, files }: any = await new Promise((resolve, reject) => {
//       form.parse(req, (err, fields, files) => {
//         if (err) {
//           reject({ err });
//         } else {
//           resolve({ fields, files });
//         }
//       });
//     });

//     console.log("Length:", files?.length);
//     console.log("Fields:", fields);

//     return NextResponse.json({ message: "ok" }, { status: 200 });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { message: "An error occurred!!!", error },
//       { status: 402 }
//     );
//   }
// };

// export const config = {
//   api: { bodyParser: false },
// };

// export { handle as POST };

// // import multiparty from "multiparty";
// // import { NextApiRequest, NextApiResponse } from "next";
// // import { NextRequest, NextResponse } from "next/server";

// // export const POST = async (req: NextApiRequest, res: NextResponse) => {
// //   const form = new multiparty.Form();
// //   try {
// //     form.parse(req, (err, fields, files) => {
// //       if (err) {
// //         return NextResponse.json(
// //           { message: "There was an error" },
// //           { status: 400 }
// //         );
// //       }
// //       console.log("Length:", files?.length);
// //       console.log(fields);
// //       return NextResponse.json({ message: "ok" }, { status: 200 });
// //     });
// //   } catch (error: any) {
// //     console.log("err:", error);
// //     return NextResponse.json(
// //       { message: "An error occured!!!", error },
// //       { status: 402 }
// //     );
// //   }
// //   // const data = await new Promise((resolve, reject) => {
// //   //   form.parse(req, function (err, fields, files) {
// //   //     if (err) reject({ err });
// //   //     resolve({ fields, files });
// //   //   });
// //   // });
// //   // console.log(`data: `, JSON.stringify(data));
// //   // console.log(form);

// //   // return NextResponse.json({ message: "Ok" });
// //   // form.parse()
// //   // form.parse(req, (err: any, fields: any, files: any) => {
// //   //   if (err) {
// //   //     console.error("Error parsing form data:", err);
// //   //     return NextResponse.json(
// //   //       { error: "Failed to process form data" },
// //   //       { status: 400 }
// //   //     );
// //   //   }

// //   //   if (!files || !files.length) {
// //   //     return NextResponse.json(
// //   //       { error: "No files were uploaded" },
// //   //       { status: 400 }
// //   //     );
// //   //   }

// //   //   console.log(`Number of files uploaded: ${files.length}`);
// //   //   NextResponse.json("ok");
// //   // });
// // };

// // export const config = {
// //   api: { bodyParser: false },
// // };

// // // import { NextApiRequest, NextApiResponse } from "next";
// // // import multiparty from "multiparty";

// // // const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
// // //   const form = new multiparty.Form();
// // //   const data = await new Promise((resolve, reject) => {
// // //     form.parse(req, function (err, fields, files) {
// // //       if (err) reject({ err });
// // //       resolve({ fields, files });
// // //     });
// // //   });
// // //   console.log(`data: `, JSON.stringify(data));

// // //   res.status(200).json({ success: true });
// // // };

// // // export default uploadImage;
// // // export const config = {
// // //   api: {
// // //     bodyParser: false,
// // //   },
// // // };
