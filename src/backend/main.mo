import Time "mo:core/Time";



actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    service : Text;
    message : Text;
    timestamp : Int;
  };

  type Review = {
    name : Text;
    company : Text;
    role : Text;
    rating : Nat;
    reviewText : Text;
    timestamp : Int;
  };

  var contactSubmissions : [ContactSubmission] = [];
  var reviews : [Review] = [];

  public func submitContact(name : Text, email : Text, phone : Text, service : Text, message : Text) : async Bool {
    let entry : ContactSubmission = {
      name;
      email;
      phone;
      service;
      message;
      timestamp = Time.now();
    };
    contactSubmissions := contactSubmissions.concat([entry]);
    true;
  };

  public query func getSubmissions() : async [ContactSubmission] {
    contactSubmissions;
  };

  public func submitReview(name : Text, company : Text, role : Text, rating : Nat, reviewText : Text) : async Bool {
    let reviewEntry : Review = {
      name;
      company;
      role;
      rating;
      reviewText;
      timestamp = Time.now();
    };
    reviews := reviews.concat([reviewEntry]);
    true;
  };

  public query func getReviews() : async [Review] {
    reviews;
  };
};
