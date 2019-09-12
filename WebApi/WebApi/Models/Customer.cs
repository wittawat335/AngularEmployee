﻿using System;
using System.Collections.Generic;

namespace WebApi.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Order = new HashSet<Order>();
        }

        public int CustomerId { get; set; }
        public string Name { get; set; }

        public ICollection<Order> Order { get; set; }
    }
}
