const students = [
    {
       "id": 1,
       "name":"Magdalena",
       "email":"mgrewes0@chronoengine.com",
       "gender":"male",
       "mobile":"734-324-1043",
       "cumulativeGPA":92.1,
       "isGraduated":true,
       "avater" : {"name":"ghklk.png", "height": 50 , "width":30},
       "idea": "auction",
       "department": "communication",
       "graduationDate": null
    },
    {
        "id": 2,
        "name": "Lyndell",
        "email": "lgilbee1@google.com.br",
        "gender":"male",
        "mobile":"734-324-1043",
        "cumulativeGPA":92.1,
        "isGraduated":true,
        "avater" : {"name":"ghklk.png", "height": 50 , "width":30},
        "idea": "auction",
        "department": "civil",
        "graduationDate": "12/1/2021"
    },
    {
        "id": 3,
        "name":"Harman",
        "email":"hgaspero2@1688.com",
        "gender":"male",
        "mobile":"734-324-1043",
        "cumulativeGPA":92.1,
        "isGraduated":true,
        "avater" : {"name":"ghklk.png", "height": 50 , "width":30},
        "idea": "auction",
        "department": "electrical",
        "graduationDate": "12/1/2021"
    }
]

export const resolvers = {
    Gender: {
      MALE: "male",
      FEMALE: "female"
    },
    Part: {
        COMMUNICATION: "communication",
        CIVIL: "civil",
        ELECTRICAL: "electrical"
    },
    Query: {
        students: () => students,
        graduationDate: () => students.filter(student => student.graduationDate != null),
        nonGraduationDate: () => students.filter(student => student.graduationDate == null)
    },
    Student: {
        __resolveType(parent, args, context, info) {
            if(parent.graduationDate != null)
            return "GraduationDate"
            else
            return "NonGraduationDate"
        }
    }
}