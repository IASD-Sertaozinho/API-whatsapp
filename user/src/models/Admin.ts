export interface Admin {
    id: string;
    password: string;
    userCel: string;
    //     username String @id @unique
    // password String
    // user     User   @relation(fields: [userCel], references: [cel])
    // userCel  String
}
