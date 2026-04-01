import Array "mo:base/Array";
import Time "mo:base/Time";

actor {
  type ContactSubmission = {
    name: Text;
    email: Text;
    phone: Text;
    service: Text;
    message: Text;
    timestamp: Int;
  };

  var submissions: [ContactSubmission] = [];

  public func submitContact(name: Text, email: Text, phone: Text, service: Text, message: Text) : async Bool {
    let entry: ContactSubmission = {
      name = name;
      email = email;
      phone = phone;
      service = service;
      message = message;
      timestamp = Time.now();
    };
    submissions := Array.append(submissions, [entry]);
    true
  };

  public query func getSubmissions() : async [ContactSubmission] {
    submissions
  };
}
