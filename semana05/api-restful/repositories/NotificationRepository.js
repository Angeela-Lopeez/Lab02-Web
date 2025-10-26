// notificationrepository.js

const BaseRepository = require("./BaseRepository");

class NotificationRepository extends BaseRepository {
  constructor() {
    super("notifications");
  }

  // Método para obtener las notificaciones por ticketId
  findByTicketId(ticketId) {
    const db = this._readDB();
    return db.notifications.filter(notification => notification.ticketId === ticketId);
  }
}

module.exports = NotificationRepository;
