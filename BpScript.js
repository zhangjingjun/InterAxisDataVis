/**
 * Created by GaoYifei on 12/5/16.
 */
var data_drive = [['Acura','AWD',13],
    ['Acura','FWD',22],
    ['AlfaRomeo','RWD',1],
    ['Alpina','AWD',1],
    ['Alpina','RWD',1],
    ['AstonMartin','FWD',1],
    ['AstonMartin','RWD',28],
    ['Audi','AWD',90],
    ['Audi','FWD',14],
    ['Audi','RWD',1],
    ['BMW','AWD',85],
    ['BMW','FWD',1],
    ['BMW','RWD',92],
    ['Bentley','AWD',18],
    ['Bentley','FWD',1],
    ['Bentley','RWD',3],
    ['Buick','AWD',5],
    ['Buick','FWD',16],
    ['Cadillac','4WD',3],
    ['Cadillac','AWD',21],
    ['Cadillac','FWD',8],
    ['Cadillac','RWD',36],
    ['Chevrolet','4WD',27],
    ['Chevrolet','AWD',8],
    ['Chevrolet','FWD',57],
    ['Chevrolet','RWD',73],
    ['Chrysler','AWD',5],
    ['Dodge','4WD',5],
    ['Dodge','AWD',11],
    ['Dodge','FWD',26],
    ['Dodge','RWD',37],
    ['Ferrari','AWD', 1],
    ['Ferrari','AWD', 1],
    ['Ferrari','RWD', 7],
    ['Fiat','FWD', 9],
    ['Ford','4WD',22],
    ['Ford','AWD',23],
    ['Ford','FWD',60],
    ['Ford','RWD',55],
    ['GMC','4WD',26],
    ['GMC','AWD', 9],
    ['GMC','AWD', 3],
    ['GMC','FWD', 7],
    ['GMC','RWD',41],
    ['Honda','4WD',4],
    ['Honda','AWD',5],
    ['Honda','AWD',1],
    ['Honda','FWD', 66],
    ['Hyundai','AWD',8],
    ['Hyundai','FWD',67],
    ['Hyundai','RWD',21],
    ['Infiniti','4WD',2],
    ['Infiniti','AWD',26],
    ['Infiniti','FWD',7],
    ['Infiniti','RWD',31],
    ['Jaguar','AWD',14],
    ['Jaguar','RWD',32],
    ['Jeep','4WD',20],
    ['Jeep','AWD',2],
    ['Jeep','FWD',17],
    ['Jeep','RWD',3],
    ['Kia', 'AWD',8],
    ['Kia','FWD',61],
    ['Kia','RWD',1],
    ['Koenigsegg','RWD',2],
    ['Lamborghini','AWD',10],
    ['Lamborghini','RWD',1],
    ['LandRover','4WD',12],
    ['LandRover','AWD',10],
    ['Lexus','4WD',4],
    ['Lexus','AWD',14],
    ['Lexus','FWD',14],
    ['Lexus','RWD',19],
    ['Lincoln','4WD',3],
    ['Lotus','RWD',9],
    ['MINI','AWD',7],
    ['MINI','FWD',44],
    ['MINI','RWD',1],
    ['Maserati','AWD',2],
    ['Maserati','RWD',17],
    ['Maybach','RWD',5],
    ['Mazda','AWD',5],
    ['Mazda','FWD',51],
    ['Mazda','RWD',7],
    ['McLaren','RWD',3],
    ['MercedesBenz','4WD',13],
    ['MercedesBenz','AWD',54],
    ['MercedesBenz','FWD',4],
    ['MercedesBenz','RWD',87],
    ['Mitsubishi','4WD',10],
    ['Mitsubishi','AWD',8],
    ['Mitsubishi','FWD',23],
    ['Mitsubishi','RWD',2],
    ['Nissan','4WD',17],
    ['Nissan','AWD',13],
    ['Nissan','FWD',56],
    ['Nissan','RWD',26],
    ['Porsche','4WD',7],
    ['Porsche','AWD',45],
    ['Porsche','FWD',4],
    ['Porsche','RWD',37],
    ['Ram','FWD',3],
    ['Ram','RWD',4],
    ['RollsRoyce','RWD',9],
    ['SAAB','AWD',2],
    ['SAAB','FWD',4],
    ['Scion','4WD',2],
    ['Scion','FWD',15],
    ['Scion','RWD',7],
    ['Smart','RWD',6],
    ['Subaru','AWD',50],
    ['Subaru','RWD',2],
    ['Suzuki','4WD',2],
    ['Suzuki','AWD',10],
    ['Suzuki','FWD',9],
    ['Suzuki','RWD',8],
    ['Tesla','AWD',1],
    ['Toyota','4WD',34],
    ['Toyota','AWD',17],
    ['Toyota','FWD',62],
    ['Toyota','RWD',31],
    ['Volkswagen','4WD', 3],
    ['Volkswagen','AWD',14],
    ['Volkswagen','FWD',136],
    ['Volvo','4WD',1],
    ['Volvo','AWD',27],
    ['Volvo','FWD',25]];


var data_year = [['Acura','2012',4],
    ['Acura',2013,13],
    ['Acura',2014,7],
    ['Acura',2015,10],
    ['Acura',2016,1],
    ['Alfa Romeo',2015,1],
    ['Alpina',2012,2],
    ['Aston Martin',2012,8],
    ['Aston Martin',2013,13],
    ['Aston Martin',2014,7],
    ['Aston Martin',2015,1],
    ['Audi',2012,35],
    ['Audi',2013,14],
    ['Audi',2014,2],
    ['Audi',2015,49],
    ['Audi',2016,7],
    ['BMW',2012,42],
    ['BMW',2013,46],
    ['BMW',2014,11],
    ['BMW',2015,77],
    ['BMW',2016,2],
    ['Bentley',2012,6],
    ['Bentley',2013,9],
    ['Bentley',2015,7],
    ['Buick',2012,7],
    ['Buick',2014,2],
    ['Buick',2015,11],
    ['Buick',2016,1],
    ['Cadillac',2012,7],
    ['Cadillac',2013,19],
    ['Cadillac',2014,13],
    ['Cadillac',2015,24],
    ['Cadillac',2016,5],
    ['Chevrolet',2012,56],
    ['Chevrolet',2013,39],
    ['Chevrolet',2014,12],
    ['Chevrolet',2015,55],
    ['Chevrolet',2016,3],
    ['Chrysler',2012,8],
    ['Chrysler',2013,11],
    ['Chrysler',2014,7],
    ['Chrysler',2015,4],
    ['Chrysler',2016,2],
    ['Dodge',2012,26],
    ['Dodge',2013,25],
    ['Dodge',2014,6],
    ['Dodge',2015,22],
    ['Ferrari',2012,5],
    ['Ferrari',2013,4],
    ['Fiat',2013,3],
    ['Fiat',2014,2],
    ['Fiat',2015,4],
    ['Fiat',2016,1],
    ['Ford',2012,37],
    ['Ford',2013,45],
    ['Ford',2014,24],
    ['Ford',2015,50],
    ['Ford',2016,4],
    ['GMC',2012,20],
    ['GMC',2013,27],
    ['GMC',2014,10],
    ['GMC',2015,29],
    ['Honda',2012,20],
    ['Honda',2013,23],
    ['Honda',2014,7],
    ['Honda',2015,24],
    ['Honda',2016,2],
    ['Hyundai',2012,31],
    ['Hyundai',2013,22],
    ['Hyundai',2014,9],
    ['Hyundai',2015,33],
    ['Hyundai',2016,2],
    ['Infiniti',2012,18],
    ['Infiniti',2013,15],
    ['Infiniti',2014,5],
    ['Infiniti',2015,27],
    ['Infiniti',2016,1],
    ['Jaguar',2012,9],
    ['Jaguar',2013,14],
    ['Jaguar',2014,3],
    ['Jaguar',2015,18],
    ['Jaguar',2016,2],
    ['Jeep',2012,12],
    ['Jeep',2013,11],
    ['Jeep',2014,1],
    ['Jeep',2015,18],
    ['Kia',2012,23],
    ['Kia',2013,15],
    ['Kia',2014,4],
    ['Kia',2015,26],
    ['Kia',2016,2],
    ['Koenigsegg',2012,2],
    ['Lamborghini',2012,2],
    ['Lamborghini',2013,7],
    ['Lamborghini',2015,3],
    ['Land Rover',2012,7],
    ['Land Rover',2013,5],
    ['Land Rover',2015,10],
    ['Lexus',2012,18],
    ['Lexus',2013,4],
    ['Lexus',2014,1],
    ['Lexus',2015,28],
    ['Lincoln',2012,6],
    ['Lincoln',2013,12],
    ['Lincoln',2014,4],
    ['Lincoln',2015,14],
    ['Lincoln',2016,1],
    ['Lotus',2012,5],
    ['Lotus',2013,4],
    ['MINI',2012,15],
    ['MINI',2013,14],
    ['MINI',2014,3],
    ['MINI',2015,20],
    ['Maserati',2012,5],
    ['Maserati',2013,6],
    ['Maserati',2015,7],
    ['Maserati',2016,1],
    ['Maybach',2012,5],
    ['Mazda',2012,18],
    ['Mazda',2013,19],
    ['Mazda',2014,7],
    ['Mazda',2015,16],
    ['Mazda',2016,3],
    ['McLaren',2015,3],
    ['Mercedes Benz',2012,41],
    ['Mercedes Benz',2013,46],
    ['Mercedes Benz',2014,12],
    ['Mercedes Benz',2015,54],
    ['Mercedes Benz',2016,5],
    ['Mitsubishi',2012,15],
    ['Mitsubishi',2013,9],
    ['Mitsubishi',2014,3],
    ['Mitsubishi',2015,16],
    ['Nissan',2012,40],
    ['Nissan',2013,21],
    ['Nissan',2014,10],
    ['Nissan',2015,39],
    ['Nissan',2016,2],
    ['Porsche',2012,31],
    ['Porsche',2013,25],
    ['Porsche',2014,6],
    ['Porsche',2015,31],
    ['Ram',2015,13],
    ['Rolls-Royce',2012,3],
    ['Rolls-Royce',2013,4],
    ['Rolls-Royce',2014,1],
    ['Rolls-Royce',2015,1],
    ['SAAB',2012,6],
    ['Scion',2012,7],
    ['Scion',2013,6],
    ['Scion',2014,3],
    ['Scion',2015,7],
    ['Scion',2016,1],
    ['Smart',2012,1],
    ['Smart',2013,2],
    ['Smart',2015,2],
    ['Smart',2016,1],
    ['Subaru',2012,16],
    ['Subaru',2013,12],
    ['Subaru',2014,7],
    ['Subaru',2015,17],
    ['Suzuki',2012,17],
    ['Suzuki',2013,12],
    ['Tesla',2016,1],
    ['Toyota',2012,50],
    ['Toyota',2013,44],
    ['Toyota',2014,5],
    ['Toyota',2015,42],
    ['Toyota',2016,3],
    ['Volkswagen',2012,34],
    ['Volkswagen',2013,32],
    ['Volkswagen',2014,35],
    ['Volkswagen',2015,51],
    ['Volkswagen',2016,1],
    ['Volvo',2012,13],
    ['Volvo',2013,15],
    ['Volvo',2014,6],
    ['Volvo',2015,19],
    ['mclaren',2012,1]];

var data_body = [['Acura','Compact Sedan',2],
    ['Acura','Crossover',1],
    ['Acura','Fullsize Sedan',1],
    ['Acura','Midsize Seden',6],
    ['Acura','SUV',9],
    ['Acura','Sedan',13],
    ['Acura','Subcompact Sedan',1],
    ['Acura','Two Seaters',1],
    ['Acura','Wagon',1],
    ['Alfa Romeo','Compact Sedan',1],
    ['Alpina','Sedan',2],
    ['Aston Martin','Compact Sedan',2],
    ['Aston Martin','Convertible',2],
    ['Aston Martin','Coupe',14],
    ['Aston Martin','Hatchback',2],
    ['Aston Martin','Roadster',2],
    ['Aston Martin','Sedan',1],
    ['Aston Martin','Subcompact Sedan',1],
    ['Aston Martin','Two Seaters',5],
    ['Audi','Compact Sedan',12],
    ['Audi','Compact Wagon',1],
    ['Audi','Convertible',2],
    ['Audi','Coupe',13],
    ['Audi','Fullsize Sedan',2],
    ['Audi','Hatchback',9],
    ['Audi','Midsize Seden',15],
    ['Audi','Not Available',2],
    ['Audi','SUV',14],
    ['Audi','Sedan',18],
    ['Audi','Standard SUV',1],
    ['Audi','Subcompact Sedan',7],
    ['Audi','Two Seaters',9],
    ['Audi','Wagon',2],
    ['BMW','Compact Sedan',15],
    ['BMW','Compact Wagon',2],
    ['BMW','Convertible',7],
    ['BMW','Coupe',21],
    ['BMW','Crossover',2],
    ['BMW','Fullsize Sedan',18],
    ['BMW','Hatchback',2],
    ['BMW','Midsize Seden',18],
    ['BMW','SUV',39],
    ['BMW','Sedan',31],
    ['BMW','Subcompact Sedan',15],
    ['BMW','Two Seaters',4],
    ['BMW','Wagon',5],
    ['Bentley','Convertible',3],
    ['Bentley','Coupe',6],
    ['Bentley','Midsize Seden',3],
    ['Bentley','Sedan',6],
    ['Bentley','Subcompact Sedan',4],
    ['Buick','Compact Sedan',2],
    ['Buick','Midsize Seden',7],
    ['Buick','SUV',6],
    ['Buick','Sedan',6],
    ['Cadillac','Compact Sedan',13],
    ['Cadillac','Compact Wagon',5],
    ['Cadillac','Crossover',2],
    ['Cadillac','Midsize Seden',11],
    ['Cadillac','SUV',18],
    ['Cadillac','Sedan',7],
    ['Cadillac','Sedan',3],
    ['Cadillac','Small SUV',3],
    ['Cadillac','Wagon',7],
    ['Chevrolet','Cargo Vans',3],
    ['Chevrolet','Compact Sedan',7],
    ['Chevrolet','Coupe',12],
    ['Chevrolet','Crossover',6],
    ['Chevrolet','Crossover',1],
    ['Chevrolet','Fullsize Sedan',4],
    ['Chevrolet','Hatchback',5],
    ['Chevrolet','Midsize Seden',10],
    ['Chevrolet','Midsize Vans',4],
    ['Chevrolet','Pickup',45],
    ['Chevrolet','Roadster',1],
    ['Chevrolet','SUV',28],
    ['Chevrolet','Sedan',19],
    ['Chevrolet','Small Pickup',5],
    ['Chevrolet','Subcompact Sedan',7],
    ['Chevrolet','Two Seaters',4],
    ['Chevrolet','Van',4],
    ['Chrysler','Compact Sedan',1],
    ['Chrysler','Compact Van',4],
    ['Chrysler','Convertible',1],
    ['Chrysler','Fullsize Sedan',6],
    ['Chrysler','Midsize Seden',4],
    ['Chrysler','Not Available',1],
    ['Chrysler','Sedan',12],
    ['Dodge','Compact Van',3],
    ['Dodge','Coupe',7],
    ['Dodge','Crossover',7],
    ['Dodge','Fullsize Sedan',7],
    ['Dodge','Hatchback',2],
    ['Dodge','Midsize Seden',11],
    ['Dodge','Pickup',8],
    ['Dodge','SUV',13],
    ['Dodge','Sedan',19],
    ['Dodge','Two Seaters',2],
    ['Ferrari','Convertible',1],
    ['Ferrari','Coupe',6],
    ['Ferrari','Hatchback',1],
    ['Ferrari','Roadster',1],
    ['Fiat','Compact Sedan',1],
    ['Fiat','Compact Wagon',2],
    ['Fiat','Convertible',1],
    ['Fiat','Hatchback',2],
    ['Fiat','SUV',1],
    ['Fiat','Subcompact Sedan',3],
    ['Ford','Cargo Vans',5],
    ['Ford','Compact Sedan',4],
    ['Ford','Compact Van',1],
    ['Ford','Coupe',8],
    ['Ford','Crossover',8],
    ['Ford','Crossover',1],
    ['Ford','Fullsize Sedan',5],
    ['Ford','Fullsize Van',1],
    ['Ford','Hatchback',3],
    ['Ford','Midsize Seden',6],
    ['Ford','Midsize Vans',5],
    ['Ford','Midsize Wagons',3],
    ['Ford','Not Available',1],
    ['Ford','Pickup',34],
    ['Ford','SUV',36],
    ['Ford','Sedan',22],
    ['Ford','Subcompact Sedan',8],
    ['Ford','Van',9],
    ['GMC','Crossover',4],
    ['GMC','Midsize Vans',2],
    ['GMC','Pickup',33],
    ['GMC','SUV',35],
    ['GMC','Small Pickup',5],
    ['GMC','Van',7],
    ['Honda','Compact Sedan',7],
    ['Honda','Compact Van',5],
    ['Honda','Compact Wagon',2],
    ['Honda','Coupe',2],
    ['Honda','Crossover',3],
    ['Honda','Hatchback',8],
    ['Honda','Midsize Seden',8],
    ['Honda','Pickup',3],
    ['Honda','SUV',12],
    ['Honda','Sedan',19],
    ['Honda','Small SUV',5],
    ['Honda','Subcompact Sedan',2],
    ['Hyundai','Compact Sedan',9],
    ['Hyundai','Compact Wagon',2],
    ['Hyundai','Coupe',9],
    ['Hyundai','Fullsize Sedan',13],
    ['Hyundai','Hatchback',4],
    ['Hyundai','Midsize Seden',6],
    ['Hyundai','SUV',18],
    ['Hyundai','Sedan',27],
    ['Hyundai','Small SUV',6],
    ['Hyundai','Subcompact Sedan',2],
    ['Infiniti','Compact Sedan',1],
    ['Infiniti','Compact Wagon',2],
    ['Infiniti','Convertible',4],
    ['Infiniti','Coupe',5],
    ['Infiniti','Crossover',7],
    ['Infiniti','Midsize Seden',11],
    ['Infiniti','SUV',12],
    ['Infiniti','Sedan',14],
    ['Infiniti','Standard SUV',2],
    ['Infiniti','Subcompact Sedan',8],
    ['Jaguar','Compact Sedan',4],
    ['Jaguar','Coupe',6],
    ['Jaguar','Fullsize Sedan',4],
    ['Jaguar','Midsize Seden',7],
    ['Jaguar','SUV',1],
    ['Jaguar','Sedan',18],
    ['Jaguar','Two Seaters',7],
    ['Jeep','Crossover',3],
    ['Jeep','SUV',39],
    ['Kia','Compact Sedan',6],
    ['Kia','Compact Van',3],
    ['Kia','Compact Wagon',4],
    ['Kia','Coupe',1],
    ['Kia','Crossover',6],
    ['Kia','Fullsize Sedan',4],
    ['Kia','Hatchback',4],
    ['Kia','Midsize Seden',7],
    ['Kia','SUV',18],
    ['Kia','Sedan',18],
    ['Koenigsegg','Coupe',2],
    ['Lamborghini','Coupe',8],
    ['Lamborghini','Roadster',1],
    ['Lamborghini','Two Seaters',3],
    ['Land Rover','SUV',22],
    ['Lexus','Compact Sedan',5],
    ['Lexus','Coupe',1],
    ['Lexus','Hatchback',1],
    ['Lexus','Midsize Seden',8],
    ['Lexus','SUV',13],
    ['Lexus','Sedan',12],
    ['Lexus','Small SUV',4],
    ['Lexus','Standard SUV',1],
    ['Lexus','Subcompact Sedan',6],
    ['Lincoln','Crossover',3],
    ['Lincoln','Fullsize Sedan',5],
    ['Lincoln','Midsize Seden',3],
    ['Lincoln','SUV',18],
    ['Lincoln','Sedan',9],
    ['Lotus','Coupe',7],
    ['Lotus','Roadster',2],
    ['MINI','Compact Sedan',12],
    ['MINI','Convertible',3],
    ['MINI','Coupe',6],
    ['MINI','Crossover',6],
    ['MINI','Hatchback',10],
    ['MINI','Roadster',1],
    ['MINI','Subcompact Sedan',5],
    ['MINI','Two Seaters',6],
    ['MINI','Wagon',3],
    ['Maserati','Convertible',1],
    ['Maserati','Coupe',5],
    ['Maserati','Fullsize Sedan',4],
    ['Maserati','SUV',1],
    ['Maserati','Sedan',5],
    ['Maserati','Subcompact Sedan',3],
    ['Maybach','Sedan',5],
    ['Mazda','Compact Sedan',3],
    ['Mazda','Compact Van',5],
    ['Mazda','Convertible',4],
    ['Mazda','Crossover',6],
    ['Mazda','Hatchback',5],
    ['Mazda','Midsize Seden',8],
    ['Mazda','SUV',11],
    ['Mazda','Sedan',15],
    ['Mazda','Subcompact Sedan',3],
    ['Mazda','Two Seaters',3],
    ['McLaren','Two Seaters',3],
    ['Mercedes Benz','Compact Sedan',16],
    ['Mercedes Benz','Compact Van',3],
    ['Mercedes Benz','Convertible',5],
    ['Mercedes Benz','Coupe',18],
    ['Mercedes Benz','Fullsize Sedan',13],
    ['Mercedes Benz','Midsize Seden',5],
    ['Mercedes Benz','Midsize Wagons',2],
    ['Mercedes Benz','Not Available',5],
    ['Mercedes Benz','Roadster',7],
    ['Mercedes Benz','SUV',36],
    ['Mercedes Benz','Sedan',33],
    ['Mercedes Benz','Subcompact Sedan',3],
    ['Mercedes Benz','Two Seaters',10],
    ['Mercedes Benz','Wagon',3],
    ['Mitsubishi','Compact Sedan',10],
    ['Mitsubishi','Compact Wagon',2],
    ['Mitsubishi','Coupe',3],
    ['Mitsubishi','Hatchback',3],
    ['Mitsubishi','SUV',13],
    ['Mitsubishi','Sedan',11],
    ['Mitsubishi','Subcompact Sedan',1],
    ['Nissan','Cargo Vans',1],
    ['Nissan','Compact Sedan',4],
    ['Nissan','Compact Van',3],
    ['Nissan','Compact Wagon',9],
    ['Nissan','Convertible',1],
    ['Nissan','Coupe',9],
    ['Nissan','Crossover',6],
    ['Nissan','Hatchback',5],
    ['Nissan','Midsize Seden',7],
    ['Nissan','Midsize Wagons',2],
    ['Nissan','Pickup',10],
    ['Nissan','Roadster',1],
    ['Nissan','SUV',24],
    ['Nissan','Sedan',16],
    ['Nissan','Small Pickup',6],
    ['Nissan','Subcompact Sedan',2],
    ['Nissan','Two Seaters',4],
    ['Porsche','Compact Sedan',9],
    ['Porsche','Convertible',8],
    ['Porsche','Coupe',21],
    ['Porsche','Fullsize Sedan',8],
    ['Porsche','Hatchback',13],
    ['Porsche','Roadster',2],
    ['Porsche','SUV',25],
    ['Porsche','Two Seaters',7],
    ['Ram','Cargo Vans',3],
    ['Ram','Compact Van',1],
    ['Ram','Pickup',9],
    ['Rolls-Royce','Convertible',2],
    ['Rolls-Royce','Fullsize Sedan',1],
    ['Rolls-Royce','Not Available',1],
    ['Rolls-Royce','Sedan',5],
    ['SAAB','Sedan',4],
    ['SAAB','Wagon',2],
    ['Scion','Compact Sedan',4],
    ['Scion','Compact Wagon',2],
    ['Scion','Coupe',6],
    ['Scion','Hatchback',6],
    ['Scion','Subcompact Sedan',5],
    ['Scion','Wagon',1],
    ['Smart','Coupe',2],
    ['Smart','Hatchback',1],
    ['Smart','Not Available',1],
    ['Smart','Two Seaters',2],
    ['Subaru','Compact Sedan',4],
    ['Subaru','Compact Wagon',5],
    ['Subaru','Crossover',1],
    ['Subaru','Hatchback',2],
    ['Subaru','Midsize Seden',4],
    ['Subaru','SUV',16],
    ['Subaru','Sedan',8],
    ['Subaru','Small SUV',3],
    ['Subaru','Wagon',9],
    ['Suzuki','Hatchback',7],
    ['Suzuki','Pickup',5],
    ['Suzuki','SUV',4],
    ['Suzuki','Sedan',13],
    ['Tesla','SUV',1],
    ['Toyota','Compact Sedan',2],
    ['Toyota','Compact Van',7],
    ['Toyota','Crossover',8],
    ['Toyota','Hatchback',18],
    ['Toyota','Midsize Seden',11],
    ['Toyota','Midsize Wagons',1],
    ['Toyota','Pickup',31],
    ['Toyota','SUV',48],
    ['Toyota','Sedan',9],
    ['Toyota','Small Pickup',8],
    ['Toyota','Subcompact Sedan',2],
    ['Volkswagen','Compact Sedan',52],
    ['Volkswagen','Compact Van',1],
    ['Volkswagen','Compact Wagon',7],
    ['Volkswagen','Convertible',3],
    ['Volkswagen','Coupe',7],
    ['Volkswagen','Hatchback',12],
    ['Volkswagen','Midsize Seden',11],
    ['Volkswagen','SUV',18],
    ['Volkswagen','Sedan',28],
    ['Volkswagen','Subcompact Sedan',11],
    ['Volkswagen','Wagon',4],
    ['Volvo','Compact Sedan',6],
    ['Volvo','Compact Wagon',4],
    ['Volvo','Convertible',1],
    ['Volvo','Coupe',2],
    ['Volvo','Crossover',1],
    ['Volvo','Hatchback',1],
    ['Volvo','Midsize Seden',3],
    ['Volvo','SUV',22],
    ['Volvo','Sedan',12],
    ['Volvo','Wagon',1],
    ['Mclaren','Coupe',1]];

var data_fuel = [['Acura','Gasoline',35],
    ['Alfa Romeo','Gasoline',1],
    ['Alpina','Gasoline',2],
    ['Aston Martin','Gasoline',29],
    ['Audi','Diesel',9],
    ['Audi','Gasoline',78],
    ['Audi','Gasoline ',19],
    ['Audi','Not Available',1],
    ['BMW','Diesel',9],
    ['BMW','Gasoline',162],
    ['BMW','Gasoline ',4],
    ['BMW','Gasoline / Electric Hybrid',3],
    ['Bentley','Flex Fuel',7],
    ['Bentley','FlexFuel',1],
    ['Bentley','Gasoline',12],
    ['Bentley','Gasoline ',2],
    ['Buick','Flex Fuel',8],
    ['Buick','Gasoline',12],
    ['Buick','Gasoline / Electric Hybrid',1],
    ['Cadillac','Electric',3],
    ['Cadillac','Flex Fuel',18],
    ['Cadillac','Gasoline',45],
    ['Cadillac','Gasoline / Electric Hybrid',1],
    ['Cadillac','electric',1],
    ['Chevrolet','Diesel',8],
    ['Chevrolet','Diesel / Electric Hybrid',1],
    ['Chevrolet','Electric',3],
    ['Chevrolet','Flex Fuel',50],
    ['Chevrolet','Gasoline',101],
    ['Chevrolet','Gasoline / Electric Hybrid',2],
    ['Chrysler','Flex Fuel',12],
    ['Chrysler','Gasoline',20],
    ['Dodge','Diesel',1],
    ['Dodge','Flex Fuel',15],
    ['Dodge','Gasoline',63],
    ['Ferrari','Gasoline',9],
    ['Fiat','Electric',1],
    ['Fiat','Gasoline',9],
    ['Ford','Diesel',3],
    ['Ford','Electric',5],
    ['Ford','Flex Fuel',50],
    ['Ford','Gasoline',99],
    ['Ford','Gasoline / Electric Hybrid',3],
    ['GMC','Diesel',3],
    ['GMC','Flex Fuel',48],
    ['GMC','Gasoline',34],
    ['GMC','Gasoline / Electric Hybrid',1],
    ['Honda','Gasoline',67],
    ['Honda','Gasoline ',1],
    ['Honda','Gasoline / Electric Hybrid',5],
    ['Honda','Natural Gas',3],
    ['Hyundai','Gasoline',96],
    ['Hyundai','Gasoline / Electric Hybrid',1],
    ['Infiniti','Diesel',3],
    ['Infiniti','Diesel / Electric Hybrid',1],
    ['Infiniti','Gasoline',53],
    ['Infiniti','Gasoline / Electric Hybrid',5],
    ['Infiniti','Natural Gas',4],
    ['Jaguar','Flex Fuel',4],
    ['Jaguar','Gasoline',29],
    ['Jaguar','Gasoline / Electric Hybrid',11],
    ['Jaguar','Not Available',2],
    ['Jeep','Flex Fuel',6],
    ['Jeep','Gasoline',35],
    ['Jeep','Not Available',1],
    ['Kia','Electric',1],
    ['Kia','Gasoline',68],
    ['Kia','Gasoline / Electric Hybrid',1],
    ['Koenigsegg','Biofuel',1],
    ['Koenigsegg','Gasoline',1],
    ['Lamborghini','Diesel',2],
    ['Lamborghini','Gasoline',8],
    ['Lamborghini','Gasoline ',2],
    ['Land Rover','Diesel / Electric Hybrid',5],
    ['Land Rover','Flex Fuel',5],
    ['Land Rover','Gasoline',12],
    ['Lexus','Diesel',4],
    ['Lexus','Gasoline',47],
    ['Lincoln','Flex Fuel',5],
    ['Lincoln','Gasoline',31],
    ['Lincoln','Gasoline / Electric Hybrid',1],
    ['Lotus','Gasoline',9],
    ['MINI','Gasoline',52],
    ['Maserati','Gasoline',19],
    ['Maybach','Gasoline',5],
    ['Mazda','Gasoline',63],
    ['McLaren','Gasoline',4],
    ['Mercedes Benz','Diesel',15],
    ['Mercedes Benz','Gasoline',101],
    ['Mercedes Benz','Gasoline ',42],
    ['Mitsubishi','Diesel / Electric Hybrid',3],
    ['Mitsubishi','Electric',4],
    ['Mitsubishi','Gasoline',32],
    ['Mitsubishi','Gasoline / Electric Hybrid',4],
    ['Nissan','Electric',2],
    ['Nissan','Gasoline',110],
    ['Porsche','Diesel',6],
    ['Porsche','Diesel / Electric Hybrid',7],
    ['Porsche','Electric',5],
    ['Porsche','Gasoline',73],
    ['Porsche','Gasoline ',2],
    ['Ram','Flex Fuel',3],
    ['Ram','Gasoline',10],
    ['Rolls-Royce','Gasoline',9],
    ['SAAB','Flex Fuel',2],
    ['SAAB','Gasoline',4],
    ['Scion','Electric',1],
    ['Scion','Flex Fuel',1],
    ['Scion','Gasoline',22],
    ['Smart','Electric',1],
    ['Smart','Gasoline',5],
    ['Subaru','Diesel / Electric Hybrid',3],
    ['Subaru','Flex Fuel',2],
    ['Subaru','Gasoline',40],
    ['Subaru','Gasoline / Electric Hybrid',6],
    ['Subaru','Natural Gas',1],
    ['Suzuki','Gasoline',29],
    ['Tesla','Electric',1],
    ['Toyota','Diesel',3],
    ['Toyota','Electric',2],
    ['Toyota','Gasoline',130],
    ['Toyota','Gasoline / Electric Hybrid',8],
    ['Toyota','Hydrogen',1],
    ['Volkswagen','Diesel',42],
    ['Volkswagen','Electric',1],
    ['Volkswagen','Flex Fuel',1],
    ['Volkswagen','Gasoline',108],
    ['Volkswagen','Gasoline / Electric Hybrid',1],
    ['Volvo','Gasoline',53]];


var bp_svg = d3.select("#bpchart").append("svg").attr("width", 1200).attr("height", 900);

var color ={AstonMartin:"#FFA07A", Bentley:"#FA8072", Jaguar:"#E9967A", LandRover :"#F08080", Lotus:"#CD5C5C"
    ,MINI:"#DC143C",McLaren:"#FF0000",RollsRoyce:"#B22222",mclaren:"#8B0000",Alpina:"#DEB887",Audi:"#D2B48C"
    ,BMW:"#F4A460",Maybach:"#DAA520",MercedesBenz:"#B8860B",Porsche:"#CD853F",Smart:"#D2691E",Volkswagen:"#A0522D"
    ,AlfaRomeo:"#D8BFD8",Ferrari:"#DDA0DD",Fiat:"#DA70D6",Maserati:"#BA55D3",Lamborghini:"#9932CC"
    ,Acura:"#ADFF2F",Honda:"#00FF7F",Infiniti:"#00FF00",Lexus:"#32CD32",Mazda:"#90EE90",Mitsubishi:"#00FA9A"
    ,Nissan:"#00FF7F",Scion:"#3CB371",Subaru:"#2E8B57",Suzuki:"#9ACD32",Toyota:"#6B8E23",Hyundai:"#FFA500"
    ,Kia:"#FF7F50",Koenigsegg:"#FF69B4",SAAB:"#FF1493",Volvo:"#FFB6C1",Buick:"#4682B4",Cadillac:"#B0C4DE"
    ,Chevrolet:"#ADD8E6",Chrysler:"#87CEFA",Dodge:"#87CEEB",Ford:"#6495ED",GMC:"#00BFFF",Jeep:"#1E90FF",Lincoln:"#4169E1"
    ,Ram:"#0000FF",Tesla:"#00008B"};


function bp_plot(data){





//        var g = d3.select("bpchart")
//                .append("svg")
//                .attr("width", 960)
//                .attr("height", 800)
//                .append("g")
//                .attr("transform", "translate(200.50)");


    var g = bp_svg.append("g").attr("id", "bpg").attr("transform","translate(160,50)");

    var bp;

    bp=viz.bP()
            .data(data)
            .min(10)
            .pad(1)
            .height(760)
            .width(800)
            .barSize(40)
            .fill(d=>color[d.primary]);

    g.call(bp);

    g.selectAll(".mainBars")
        .on("mouseover",mouseover)
        .on("mouseout",mouseout);

    g.selectAll(".mainBars").append("text").attr("class","label")
        .attr("id", "bpText")
        .attr("x",d=>(d.part=="primary"? -30: 30))
        .attr("y",d=>+6)
        .text(d=>d.key)
        .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));

    g.selectAll(".mainBars").append("text").attr("class","perc")
        .attr("id", "bpText")
        .attr("x",d=>(d.part=="primary"? -150: 160))
        .attr("y",d=>+6)
        .text(function(d){ return d3.format("0.0%")(d.percent)})
        .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));

    function mouseover(d){
        bp.mouseover(d);
        g.selectAll(".mainBars")
            .select(".perc")
            .text(function(d){ return d3.format("0.0%")(d.percent)})
    }
    function mouseout(d){
        bp.mouseout(d);
        g.selectAll(".mainBars")
            .select(".perc")
            .text(function(d){ return d3.format("0.0%")(d.percent)})
    }
    d3.select(self.frameElement).style("height", "900px");
}


bp_plot(data_body);


document.getElementById("BodyButton").onclick = function () {
    // console.log("button click");
    d3.select("#bpg").remove();
    bp_plot(data_body);


};

document.getElementById("DriveButton").onclick = function () {
    // console.log("button click");
    d3.select("#bpg").remove();
    bp_plot(data_drive);


};
document.getElementById("FuelButton").onclick = function () {
    // console.log("button click");
    d3.select("#bpg").remove();
    bp_plot(data_fuel);
};
document.getElementById("YearButton").onclick = function () {
    // console.log("button click");
    d3.select("#bpg").remove();
    bp_plot(data_year);
};