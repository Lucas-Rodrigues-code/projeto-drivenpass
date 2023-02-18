import  prisma  from "../database/database.js";

async function create(token:string,userId:number) {
  return await prisma.session.create({
    data:{
        userId,
        token
    }
  });
}

const sessionRepository = {
  create,
};

export default sessionRepository;