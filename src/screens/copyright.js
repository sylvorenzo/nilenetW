import React from 'react';
import { Link } from 'react-router-dom';

export default function CopyrightContent(){

    return(
        <div className="finances-content">
        <iframe
            src='https://www.youtube.com/embed/Tamoj84j64I'
            style={{height:400, width:400, alignSelf:'center'}}
            tabIndex
        />
        <h1>Copyright and Intellectual Property </h1>
        <h2>What Is a Copyright?</h2>
        <p>
        Copyright is a type of intellectual property that gives its owner 
        the exclusive right to make copies of a creative work, usually for a limited time. 
        The creative work may be in a literary, artistic, educational, or musical form. 
        Copyright is intended to protect 
        the original expression of an idea in the form of a creative work, but not the idea itself.
        </p>
        <Link target="__blank" to={{pathname:'https://en.wikipedia.org/wiki/Copyright'}}>Learn More.</Link>
        <h1>Intellectual Property</h1>
        <p>
        intellectual property (IP) is a category of property that includes intangible 
        creations of the human intellect. There are many types of intellectual property, 
        and some countries recognize more than others. 
        The most well-known types are copyrights, patents, trademarks, and trade secrets.
        </p>
        <Link target="__blank" to={{pathname:'https://en.wikipedia.org/wiki/Intellectual_property'}}>Learn More.</Link>
        <h1>Trademark</h1>
        <p>
        A trademark (also written trademark or trademark) is a type of intellectual 
        property consisting of a recognizable sign, design, or expression which identifies 
        products or services of a particular source from those of others, 
        although trademarks used to identify services are usually called service marks.
        </p>
        <Link target="_blank" to={{pathname:'https://en.wikipedia.org/wiki/Trademark'}}>Learn More</Link>
        <h2>How To Register a Trademark?</h2>
        <p>
        Register your trademark with the Companies and Intellectual Property Commission (CIPC), 
        to prevent your competitors from using it. 
        CIPC administers the Register of Trademarks, which is the official record of all 
        the trademarks that have formally been applied 
        for and/or registered in the Republic of South Africa, since 1916. See website for more:
        </p>
        <Link target="_blank" to={{pathname:'https://www.gov.za/services/intellectual-property/register-trademark'}}>
            Register a Trademark
        </Link>
        <h2>Why is it important as an entrepreneur to protect your work?</h2>
        <p>
        It is important because it protects you from taken advantage of 
        by other individuals by making sure that the holder of the copyright 
        is the only person benefitting from it. No one can steal your work and use it as others. 
        Copyright protects 
        things like your ideas, your original content, your business name, the products, etc.
        </p>
        <h2>How to register copyright?</h2>
        <p>
        Copyright is secured automatically when you create an original 
        work that people can see or hear such as a book, painting or music. 
        Most works eligible for copyright protection do not require 
        registration or other formalities, except for cinematograph films.
        You can create your own copyright by putting the words “copyright” or 
        “copyright reserved” or the internationally recognised copyright symbol 
        followed by your name and the year e.g., © Baloyi 2011 on your original work.
        
        </p>
        <Link target="_blank" to={{pathname:' https://www.gov.za/services/intellectual-property/register-copyright '}}>
            Register copyright
        </Link>
        <h2>South Africa copyright law</h2>
        <p>
        The copyright law of South Africa governs copyright, 
        the right to control the use and distribution of artistic and creative works, 
        in the Republic of South Africa. It is embodied in the Copyright Act, 1978 and 
        its various amendment acts, and administered by the Companies and Intellectual 
        Property Commission in the Department of Trade and Industry. As of March 2019, 
        a major amendment to the law in the Copyright Amendment Bill 
        has been approved by the South African Parliament and is awaiting signature 
        by the President.
        </p>
        </div>
  
    )
}