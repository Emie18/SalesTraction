function json_student(student){
    const account = student.id_account_account
    const languages = student.language_students
    const sector = account.account_sectors

    if(!account || !languages || !sector) return null

    return {
        account_id: student.id_account,
        name: account.name,
        surname: student.surname,
        email: account.email,
        image: account.image,
        disponibility: student.disponibility,
        description: account.description,
        linkedin: account.linkedin,
        school: student.school,
        region: account.region,
        languages: languages.map(language => language.lang),
        sector: sector.map(sector => sector.sector)
    }
}

function json_startup(startup){
    const account = startup.id_account_account
    const sector = account.account_sectors
    if(!account || !sector) return null

    return {
        account_id: startup.id_account,
        name: account.name,
        email: account.email,
        siret: startup.siret,
        image: account.image,
        description: account.description,
        linkedin: account.linkedin,
        region: account.region,
        sector: sector.map(sector => sector.sector),
        valid: startup.is_valid
    }
}

function json_offer(offer){
    const startup = offer.id_startup_startup

    if(!offer || !startup) return null

    return {
        id : offer.id,
        name: offer.name,
        product: offer.product,
        pitch: offer.pitch,
        range: offer.range_offer,
        commission: offer.commission_offer_commission,
        client:	offer.client,
        work_mode: offer.work_mode,
        startup: json_startup(startup)
    }
}


function json_students(students){
    var list = []
    for(const student of students){ list.push(json_student(student)) }
    return list
}

function json_startups(startups){
    var list = []
    for(const startup of startups){ list.push(json_startup(startup)) }
    return list
}

function json_offers(offers){
    var list = []
    for(const offer of offers){ list.push(json_offer(offer)) }
    return list
}

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}


exports.shuffle = shuffle
exports.student = json_student
exports.startup = json_startup
exports.offer = json_offer

exports.students = json_students
exports.startups = json_startups
exports.offers = json_offers