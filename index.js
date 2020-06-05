import FlatfileImporter from "flatfile-csv-importer";
import $ from "jquery";

FlatfileImporter.setVersion(2);

var LICENSE_KEY = "2bda9380-a84c-11e7-8243-1d92e7c67d6d";
const robotImporter = new FlatfileImporter(LICENSE_KEY, {
  webhookUrl: "https://webhook.site/e0090ccb-1f0b-4d6b-94fc-d370800f032f",
  type: "Users",
  fields: [
    {
      label: "First Name",
      key: "first_name",
      validators: [{ validate: "required" }]
    },
    {
      label: "Last Name",
      key: "last_name",
      validators: [{ validate: "required" }]
    },
    {
      label: "Email Address",
      key: "email",
      validators: [
        { validate: "required" },
        {
          validate: "regex_matches",
          regex:
            "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])",
          error: "Must be in email format"
        }
      ]
    }
  ]
});

robotImporter.setCustomer({
  userId: 1,
  email: "john@doe.com",
  name: "John Doe",
  companyName: "Acme Inc.",
  companyId: "09394"
});

$("#launch").click(function() {
  robotImporter
    .requestDataFromUser()
    .then(function(results) {
      robotImporter.displaySuccess("Success!");
      $("#raw_output").text(JSON.stringify(results.data, " ", 2));
    })
    .catch(function(error) {
      console.info(error || "window close");
    });
});
