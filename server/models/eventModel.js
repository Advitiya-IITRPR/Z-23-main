class Event {
    constructor(cashPrize, category, description, entryFee, imageUrl, isAdvitiya, name, participants, participantList, rulebookLink) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
        this.isAdvitiya = isAdvitiya;
        this.participants = participants;
        this.participantList = participantList;
        this.entryFee = entryFee;
        this.cashPrize = cashPrize;
        this.rulebookLink = rulebookLink;
    }
}

module.exports = Event;