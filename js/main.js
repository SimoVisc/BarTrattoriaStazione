"use strict";

const { createApp } = Vue;

createApp({
  data() {
    return {
      isDarkMode: false,

      notifyOn: false,

      currentContact: -1,

      newMessage: {
        date: "",
        message: "",
        status: "",
        infoVisible: false,
      },

      searchedLetters: "",

      contacts: [
        {
          name: "Michele",
          avatar: "_1",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
              infoVisible: false,
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
              infoVisible: false,
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
              infoVisible: false,
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "_2",
          visible: true,
          messages: [
            {
              date: "5/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
              infoVisible: false,
            },
            {
              date: "5/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
              infoVisible: false,
            },
            {
              date: "5/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
              infoVisible: false,
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "_3",
          visible: true,
          messages: [
            {
              date: "5/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
              infoVisible: false,
            },
            {
              date: "5/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
              infoVisible: false,
            },
            {
              date: "5/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
              infoVisible: false,
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "_4",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
              infoVisible: false,
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
              infoVisible: false,
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "_5",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
              infoVisible: false,
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
              infoVisible: false,
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "_6",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
              infoVisible: false,
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
              infoVisible: false,
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
              infoVisible: false,
            },
          ],
        },
        {
          name: "Federico",
          avatar: "_7",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
              infoVisible: false,
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
              infoVisible: false,
            },
          ],
        },
        {
          name: "Davide",
          avatar: "_8",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
              infoVisible: false,
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
              infoVisible: false,
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
              infoVisible: false,
            },
          ],
        },
      ],
    };
  },
  methods: {
    // Contact selection
    onContactClick(i) {
      this.currentContact = i;
    },

    // Date format info
    dateFormat(data) {
      return moment(data).fromNow();
    },

    // Send a message and receive a reply
    onClickEnter() {
      this.newMessage.date = new Date();
      this.newMessage.status = "sent";
      this.contacts[this.currentContact].messages.push(this.newMessage);

      this.newMessage = {
        date: "",
        message: "",
        status: "",
        infoVisible: false,
      };

      // Container of the current pointed contact
      let pointedContact = this.currentContact;

      setTimeout(() => {
        axios
          .get(`https://api.chucknorris.io/jokes/random`)
          .then((response) => {
            const result = response.data;

            this.newMessage = {
              message: result.value,
              status: "received",
              infoVisible: false,
            };

            this.newMessage.date = new Date();
            this.contacts[pointedContact].messages.push(this.newMessage);
            this.notifyMe(this.newMessage.message);

            this.newMessage = {
              date: "",
              message: "",
              status: "",
              infoVisible: false,
            };
          });
      }, 1000);
    },

    // Contact search
    onContactSearch() {
      return this.contacts.filter((contact) => {
        if (
          contact.name
            .toLowerCase()
            .includes(this.searchedLetters.toLowerCase())
        ) {
          contact.visible = true;
        } else {
          contact.visible = false;
        }
      });
    },

    // Delete the selected message
    onDeleteClick(i) {
      this.contacts[this.currentContact].messages.splice(i, 1);
    },

    // Info of the selected message
    onInfoClick(i) {
      let infoIsVisible =
        this.contacts[this.currentContact].messages[i].infoVisible;

      if (infoIsVisible) {
        this.contacts[this.currentContact].messages[i].infoVisible = false;
      } else {
        this.contacts[this.currentContact].messages[i].infoVisible = true;
      }
    },

    // Change theme Clear/Dark
    onThemeChange() {
      if (this.isDarkMode) {
        this.isDarkMode = false;
      } else {
        this.isDarkMode = true;
      }
    },

    // Reload the application
    onClickReload() {
      window.location.reload();
    },

    // Change the value of notify
    onNotifyChange() {
      Notification.requestPermission();

      if (this.notifyOn) {
        this.notifyOn = false;
      } else {
        this.notifyOn = true;
      }
    },

    // Request the permission for notification
    notifyMe(message) {
      console.log(Notification.permission);

      if (Notification.permission === "granted") {
        console.log(Notification.permission);
        this.showNotification(message);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "garanted") {
            console.log(Notification.permission);
            this.showNotification(message);
          }
        });
      }
    },

    // Creation of a notification
    showNotification(message) {
      const notification = new Notification(
        this.contacts[this.currentContact].name,
        {
          body: message,
          icon: "https://cdn.pixabay.com/photo/2015/08/03/13/58/whatsapp-873316__340.png",
        }
      );
    },
  },
}).mount("#app");
