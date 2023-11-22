export const suggestBahnCard = (
    userAge: number,
    ticketType: string,
    monthlyBudget: number,
    trips: number,
    trainClass: number
  ): { suggestion: string; suggestionPrice: number } => {

    let suggestion = ""
    let suggestionPrice = 0

    console.log(userAge, ticketType, monthlyBudget, trips, trainClass)

    if (
      userAge <= 18 &&
      (ticketType == "supersparpreis" || ticketType == "sparpreis")
    ) {
      suggestion = "JugendBahncard 25"
      suggestionPrice = 7.90
    }

    // Bahncard 100
    else if (monthlyBudget >= 7356 / 12 && trainClass == 1) {
      suggestion = "BahnCard 100 1st Class"
      suggestionPrice = 7356
    } else if (monthlyBudget >= 4339 / 12 && trainClass == 2) {
      suggestion = "BahnCard 100 2nd Class"
      suggestionPrice = 4339
    }
    // MyBahncard 50 (Jugend)
    else if (
      userAge <= 27 &&
      (ticketType == "flexpreisAktion" ||
        ticketType == "flexpreis" ||
        monthlyBudget / trips >= 50) &&
      trainClass == 1
    ) {
      suggestion = "BahnCard 50 1st Class"
      suggestionPrice = 241
    } else if (
      userAge <= 27 &&
      (ticketType == "flexpreisAktion" ||
        ticketType == "flexpreis" ||
        monthlyBudget / trips >= 50) &&
      trainClass == 2
    ) {
      suggestion = "BahnCard 50 2nd Clas"
      suggestionPrice = 69.90
    }
    // Bahncard 50
    else if (
      userAge > 27 &&
      (ticketType == "flexpreisAktion" ||
        ticketType == "flexpreis" ||
        monthlyBudget / trips >= 50) &&
      trainClass == 1
    ) {
      suggestion = "BahnCard 50 1st Class"
      suggestionPrice = 241
    } else if (
      userAge > 27 &&
      (ticketType == "flexpreisAktion" ||
        ticketType == "flexpreis" ||
        monthlyBudget / trips >= 50) &&
      trainClass == 2
    ) {
      suggestion = "BahnCard 50 2nd Clas"
      suggestionPrice = 492
    }

    // MyBahncard 25
    else if (
      userAge <= 27 &&
      (ticketType == "supersparpeis" ||
        ticketType == "sparpreis" ||
        monthlyBudget / trips < 50) &&
      trainClass == 1
    ) {
      suggestion = "BahnCard 25 1st Class"
      suggestionPrice = 77.90
    } else if (
      userAge <= 27 &&
      (ticketType == "supersparpeis" ||
        ticketType == "sparpreis" ||
        monthlyBudget / trips < 50) &&
      trainClass == 2
    ) {
      suggestion = "BahnCard 25 2nd Clas"
      suggestionPrice = 36.90
    }

    // Bahncard 25
    else if (
      userAge > 27 &&
      (ticketType == "supersparpeis" ||
        ticketType == "sparpreis" ||
        monthlyBudget / trips < 50) &&
      trainClass == 1
    ) {
      suggestion = "BahnCard 25 1st Class"
      suggestionPrice = 121
    } else if (
      userAge > 27 &&
      (ticketType == "supersparpeis" ||
        ticketType == "sparpreis" ||
        monthlyBudget / trips < 50) &&
      trainClass == 2
    ) {
      suggestion = "BahnCard 25 2nd Clas"
      suggestionPrice = 59.90
    }

    // else
    else {
      suggestion = "BahnCard 25 2nd Class"
      suggestionPrice = 59.90
    }



     return { suggestion, suggestionPrice };
  };
  
  export const getBahnCardImageUrl = (bahnCardSuggestion: string): string => {
    // ... existing logic for getting BahnCard image URL
    let imageURL = ""
    switch (bahnCardSuggestion) {
        case "JugendBahncard 25":
          return imageURL = "../../components/bahncardimages/youth-bahncard25"
        case imageURL ="BahnCard 25 2nd Class":
          return "../../components/bahncardimages/bahncard25-2nd"
        case imageURL ="BahnCard 25 1st Class":
          return "../../components/bahncardimages/bahncard25-1st"
        case imageURL ="BahnCard 50 2nd Class":
          return "../../components/bahncardimages/bahncard50-2nd"
        case imageURL = "BahnCard 50 1st Class":
          return "../../components/bahncardimages/bahncard50-1st"
        case imageURL ="BahnCard 100 2nd Class":
          return "../../components/bahncardimages/bahncard100-2nd"
        case imageURL ="BahnCard 100 1st Class":
          return "bahncard101/components/bahncardimages/bahncard100-1st"
  
        default:
          return ""
      }
     return imageURL;
  };
  